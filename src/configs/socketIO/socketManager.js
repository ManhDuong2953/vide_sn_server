import { Server } from "socket.io"; // Đảm bảo import đúng Server từ socket.io
require("dotenv").config();

let io; // Biến để lưu instance của socket.io

const initializeSocket = (httpServer, users) => {
  if (!io) {
    // Kiểm tra xem io đã được khởi tạo chưa
    io = new Server(httpServer, {
      cors: {
        origin: process.env.HOST || "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Lưu socket ID của người dùng
      socket.on("registerUser", (data) => {
        addUser(socket.id, data?.user_id, users);
        console.log(
          `${data?.user_id} has connected with socket ID: ${socket.id}`
        );
        // Gửi danh sách online hiện tại cho tất cả người dùng
        io.emit("onlineUsers", getAllOnlineUsers(users));
      });
      // Lắng nghe sự kiẹn đang viết tin nhắn
      socket.on("senderWritting", (data) => {
        io.to(getSocketIdByUserId(data?.receiver_id, users)).emit(
          "receiverNotifiWritting",
          {
            sender_id: data?.sender_id,
            status: data?.status,
          }
        );
      });

      // Khi client ngắt kết nối
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        removeUser(socket.id, users);
        // Cập nhật danh sách online cho tất cả người dùng
        io.emit("onlineUsers", getAllOnlineUsers(users));
      });

      //Lắng nghe có sự kiện mời vào cuộc gọi
      socket.on("callUser", (data) => {
        io.to(getSocketIdByUserId(data?.receiver_id, users)).emit(
          "user-calling",
          data
        );

      });
      // Chấp nhận cuộc gọi
      socket.on("acceptCallUser", (data) => {      
        io.to(getSocketIdByUserId(data?.sender_id, users)).emit(
          "statusAcceptedCallUser",
          {
            status: data?.status,
          }
        );
      });
      // Từ chối cuộc gọi

      // // Đóng cuộc gọi
      // socket.on("cancelCallUser", () =>{
      //   io.to(getSocketIdByUserId(data?.receiver_id, users)).emit(
      //     "cancelCallUser",
      //     data
      //   );
      // })
    });
  }

  return io; // Trả về instance của socket
};

// Hàm thêm người dùng
const addUser = (socketId, userId, users) => {
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    existingUser.socketId = socketId; // Cập nhật socketId nếu đã tồn tại
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
