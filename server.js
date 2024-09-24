import express from "express";
import RouterAPI from "./src/routes";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { initializeSocket } from "./src/configs/socketIO/socketManager";

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 8080;
const hostClient = process.env.HOST || "http://localhost:3000";
app.use(
  cors({
    origin: hostClient,
    credentials: true,
  })
);

// Khởi tạo mảng người dùng
let users = [];

// Khởi tạo server HTTP
const server = createServer(app);

const io = initializeSocket(server, users);
export { io, users};
// Khởi động server HTTP
server.listen(port, () => {
  console.log("Máy chủ Vibe đang chạy trên cổng:", port);
});

// Router API
app.use("/api", RouterAPI(express.Router()));
