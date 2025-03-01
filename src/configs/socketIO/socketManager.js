import { Server } from "socket.io"; // Đảm bảo import đúng Server từ socket.io
import db from "../database/database.config.js";
require("dotenv").config();

let io; // Biến để lưu instance của socket.io
const initializeSocket = (httpServer, users) => {
  if (!io) {
    // Kiểm tra xem io đã được khởi tạo chưa
    io = new Server(httpServer, {
      cors: {
        origin: process.env.HOST || "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Lưu socket ID của người dùng
      socket.on("registerUser", (data) => {
        addUser(socket.id, data?.user_id, users);

        // Gửi danh sách online hiện tại cho tất cả người dùng
        io.emit("onlineUsers", getAllOnlineUsers(users));
      });

      socket.on("dark_theme", async (data) => {
        const darkThemeQuery =
          "UPDATE UserSetting SET dark_theme = ? WHERE user_id = ?";
        await db.execute(darkThemeQuery, [data?.dark_theme, data?.user_id]);
      });
      // Lắng nghe sự kiện đang viết tin nhắn
      socket.on("senderWritting", (data) => {
        const receiverSocketId = getSocketIdByUserId(data?.receiver_id, users);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiverNotifiWritting", {
            sender_id: data?.sender_id,
            status: data?.status,
          });
        } else {
          console.error(`No socket found for user ID: ${data?.receiver_id}`);
        }
      });

      // Lắng nghe có sự kiện mời vào cuộc gọi
      socket.on("callUser", (data) => {
        const receiverSocketId = getSocketIdByUserId(data?.receiver_id, users);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("user-calling", data);
        } else {
          console.error(`No socket found for user ID: ${data?.receiver_id}`);
        }
      });

      // Chấp nhận cuộc gọi
      socket.on("acceptCallUser", (data) => {
        const senderSocketId = getSocketIdByUserId(data?.sender_id, users);
        const receiverSocketId = getSocketIdByUserId(data?.receiver_id, users);
        if (senderSocketId && receiverSocketId) {
          io.to([receiverSocketId, senderSocketId]).emit(
            "statusAcceptedCallUser",
            {
              status: data?.status,
            }
          );
        } else {
          console.error(`No socket found for user ID: ${data?.sender_id}`);
        }
      });

      // Lắng nghe sự kiện kết thúc cuộc gọi
      socket.on("endCall", (data) => {
        // Ensure you send the event to the other user in the call
        const { receiver_id, sender_id } = data;

        // Find the other user based on their ID and socket ID
        const receiverSocketId = getSocketIdByUserId(receiver_id, users);
        const senderSocketId = getSocketIdByUserId(sender_id, users);

        // Emit the "endCall" event to the other user
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("callEnded", {
            message: "The call has ended.",
          });
        }

        if (senderSocketId) {
          io.to(senderSocketId).emit("callEnded", {
            message: "The call has ended.",
          });
        }
      });

      // Nhận peerID người gọi
      socket.on("getPeerIDCaller", (data) => {
        io.to(getSocketIdByUserId(data?.sender_id, users)).emit(
          "sendPeerIDCaller",
          data?.peer_id
        );
      });

      //T  cuộc gọi
      socket.on("statusCall", (data) => {
        const receiverSocketId = getSocketIdByUserId(data?.to, users);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("statusCallToUser", {
            isCallRemoteAccepted: data.isCallAccepted,
            isVideoRemoteMuted: data?.isVideoMuted,
            isAudioRemoteMuted: data?.isAudioMuted,
          });
        } else {
          console.error(`No socket found for user ID: ${data?.sender_id}`);
        }
      });

      //Chặn người dùng
      socket.on("sendBlockUser", (data) => {
        if (data?.status === "block") {
          io.to([
            getSocketIdByUserId(data?.receiver_id, users),
            getSocketIdByUserId(data?.requestor_id, users),
          ]).emit("receivedBlockUser", data);
        }
        if (data?.status === "unblock") {
          io.to([
            getSocketIdByUserId(data?.receiver_id, users),
            getSocketIdByUserId(data?.requestor_id, users),
          ]).emit("receivedBlockUser", {});
        }
      });

      // Khi client ngắt kết nối
      socket.on("disconnect", () => {
        removeUser(socket.id, users);
        // Cập nhật danh sách online cho tất cả người dùng
        io.emit("onlineUsers", getAllOnlineUsers(users));
      });
    });
  }

  return io; // Trả về instance của socket
};

// Hàm thêm người dùng
const addUser = (socketId, userId, users) => {
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    existingUser.socketId = socketId; // Cập nhật soc ketId nếu đã tồn tại
  } else {
    users.push({ socketId, userId }); // Thêm người dùng mới
  }
};

// Hàm xóa người dùng
const removeUser = (socketId, users) => {
  const userIndex = users.findIndex((user) => user.socketId === socketId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Xóa người dùng khỏi mảng
  }
};

// Hàm lấy socketId theo userId
const getSocketIdByUserId = (userId, users) => {
  const user = users.find((user) => user.userId === userId);
  return user ? user.socketId : null; // Trả về socketId nếu tìm thấy, nếu không trả về null
};

// Hàm lấy tất cả người dùng online
const getAllOnlineUsers = (users) => {
  return users.map((user) => user.userId);
};

export {
  initializeSocket,
  getAllOnlineUsers,
  addUser,
  removeUser,
  getSocketIdByUserId,
};
