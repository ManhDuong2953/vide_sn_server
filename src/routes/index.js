import express from "express";
import UserRouter from "./Users/index.router.js";
import EmailOTPRouter from "./Email/email_otp.router.js";
import TokenRouter from "./Token/token.router.js";
import MessengerRouter from "./Message/messenger.router.js";
import { GroupsRouter } from "./Group/index.router.js";
import StoryRouter from "./Story/story.router.js";
import PostRouter from "./Post/post.router.js";
import MarketplaceRouter from "./Marketplace/marketplace.router.js";
import SearchRouter from "./Search/index.router.js";
import NoticeRouter from "./Notice/index.router.js";

export default function RouterAPI(app) {
  app.use("/users", UserRouter(express.Router()));
  app.use("/otp", EmailOTPRouter(express.Router()));
  app.use("/token", TokenRouter(express.Router()));
  app.use("/messenger", MessengerRouter(express.Router()));
  app.use("/group", GroupsRouter(express.Router()));
  app.use("/stories", StoryRouter(express.Router()));
  app.use("/post", PostRouter(express.Router()));
  app.use("/marketplace", MarketplaceRouter(express.Router()));
  app.use("/search-page", SearchRouter(express.Router()));
  app.use("/notices", NoticeRouter(express.Router()));
  return app;
}
