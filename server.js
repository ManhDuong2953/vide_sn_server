import express from "express";
import RouterAPI from "./src/routes/index.js";
import { createServer } from "http";
import { ExpressPeerServer } from "peer";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { getSocketIdByUserId, initializeSocket } from "./src/configs/socketIO/socketManager.js";
import { ethers } from "ethers";
import { Marketplace } from "./src/models/Marketplace/marketplace.model.js";
import { MarketplaceFile } from "./src/models/Marketplace/marketplace_file.model.js";
import Authentication from "./src/middlewares/authentication/authentication_token.js";
import { Authorization } from "./src/middlewares/authorization/authorization_token.js";
import {
  TransactionDetail,
  UserGLBFile,
} from "./src/models/Marketplace/transaction_detail.model.js";
import { sendNoticeToFriends } from "./src/ultils/socket_notice.js";
import Message from "./src/models/Message/messenger.model.js";
dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 8080;
const whitelist = [process.env.HOST, "http://localhost:3000", "*"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors({
//   origin: (origin, callback) => {
//     callback(null, true);
//   },
//   credentials: true
// }));

// Khởi tạo mảng người dùng
let users = [];

// Khởi tạo server HTTP
const server = createServer(app);

// Khởi tạo PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// Sử dụng PeerJS server tại endpoint `/peerjs`
app.use("/peerjs", peerServer);

// Initialize socket.io
const io = initializeSocket(server, users);
export { io, users };

// Khởi động server HTTP
server.listen(port, () => {
  console.log("Máy chủ Vibe đang chạy trên cổng:", port);
});

app.get("/", (req, res) => {
  res.send("Welcome to Vibe Server");
});
// Router API
app.use("/api", RouterAPI(express.Router()));

// Kết nối với Ganache (thường chạy ở cổng 8545)
const provider = new ethers.JsonRpcProvider("HTTP://192.168.3.103:7545");
app.post(
  "/api/confirm-purchase",
  Authentication,
  Authorization,
  async (req, res) => {
    try {
      const {
        transactionHash,
        sellerAddress,
        buyerAddress,
        amount,
        productId,
      } = req.body;
      const { user_id } = req.body?.data; // ID người mua

      // 1️⃣ Kiểm tra giao dịch có tồn tại trên Ganache không
      const tx = await provider.getTransaction(transactionHash);
      if (!tx) {
        return res.status(400).json({
          status: false,
          message: "Giao dịch không tồn tại trong blockchain!",
        });
      }

      // 2️⃣ Kiểm tra giao dịch đã được xác nhận hay chưa
      const receipt = await provider.getTransactionReceipt(transactionHash);
      if (!receipt || receipt.status !== 1) {
        return res.status(400).json({
          status: false,
          message: "Giao dịch chưa được xác nhận hoặc thất bại!",
        });
      }

      // 3️⃣ Kiểm tra địa chỉ gửi, nhận và số tiền
      const expectedValue = ethers.parseEther(amount?.toString());
      if (
        tx.to.toLowerCase() !== sellerAddress.toLowerCase() ||
        tx.from.toLowerCase() !== buyerAddress.toLowerCase() ||
        tx.value !== expectedValue
      ) {
        return res.status(400).json({
          status: false,
          message: "Giao dịch không khớp với đơn hàng!",
        });
      }

      // 4️⃣ Kiểm tra sản phẩm tồn tại trong database
      const product = await Marketplace.getById(productId);
      if (!product) {
        return res
          .status(400)
          .json({ status: false, message: "Sản phẩm không tồn tại!" });
      }

      // 5️⃣ Lấy danh sách media files liên quan đến productId
      const mediaFiles = await MarketplaceFile.getAllByProductId(productId);

      if (!mediaFiles || mediaFiles.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Không tìm thấy file GLB nào!" });
      }

      // 6️⃣ Lưu giao dịch vào bảng TransactionDetail
      const newTransaction = new TransactionDetail({
        transaction_hash: transactionHash,
        buyer_address: buyerAddress,
        seller_address: sellerAddress,
        amount: amount,
        product_id: productId,
        buyer_id: user_id,
        seller_id: product?.seller_id,
      });

      const transID = await newTransaction.create();
      if (!transID) {
        return res
          .status(500)
          .json({ status: false, message: "Lỗi khi lưu giao dịch!" });
      }

      // 7️⃣ Lưu file GLB vào bảng UserGLBFile
      const newUserGLB = new UserGLBFile({
        user_id: user_id,
        transaction_id: transID,
        glb_file_link: mediaFiles?.media_file_link,
      });

      const idUserGLB = await newUserGLB.create();

      await sendNoticeToFriends(
        user_id,
        [product?.seller_id],
        "đã mua sản phẩm của bạn.",
        "/marketplace/product/detail/" + productId
      );

      const cskh_id = "uid_111668358174309320494";
      const content_text = `
      <p>Chào bạn, tôi là Hệ thống CSKH của Vibe Social, bạn có một đơn hàng như sau:</p>
      <ul>
        <li><strong>Mã giao dịch:</strong> ${transID}</li>
        <li><strong>Hash giao dịch:</strong> ${transactionHash}</li>
        <li><strong>Người bán:</strong> ${sellerAddress}</li>
        <li><strong>Người mua:</strong> ${buyerAddress}</li>
        <li><strong>Mã sản phẩm:</strong> ${productId}</li>
        <li><strong>Số tiền:</strong> ${amount} ETH</li>
        <li><strong>Link 3D:</strong> <a href="/three_dimension/${idUserGLB}">Xem mô hình 3D</a></li>
      </ul>
    `;
      const newMessage = new Message({
        sender_id: cskh_id,
        receiver_id: user_id,
      });

      // Attempt to create the message in the database
      const result = await newMessage.create(content_text);

      if (result) {
        const sender_id = getSocketIdByUserId(cskh_id, users);
        const receiver_id = getSocketIdByUserId(user_id, users);
        // Send message to receiver regardless of database result
        io.to([sender_id, receiver_id]).emit("receiveMessage", {
          messenger_id: result,
          sender_id: cskh_id,
          receiver_id: user_id,
          content_text: content_text,
        });
        // Update conversation status for both users
        io.to(getSocketIdByUserId(cskh_id, users)).emit("updateConversation");
        io.to(getSocketIdByUserId(user_id, users)).emit("updateConversation");
      }

      // 8️⃣ Trả về link sản phẩm
      return res.status(200).json({
        status: true,
        message: "Giao dịch thành công. Sản phẩm đã được gửi vào tin nhắn.",
      });
    } catch (error) {
      console.error("Lỗi server:", error);
      return res.status(500).json({ status: false, message: "Lỗi server!" });
    }
  }
);
