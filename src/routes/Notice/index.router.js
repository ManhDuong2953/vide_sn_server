import { Router } from "express";
import { createNotice, deleleAllNotice, deleleAllNoticeCurrent, deleteNotice, listNoticesByUser } from "../../controllers/Notice/notice.controller";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization } from "../../middlewares/authorization/authorization_token";

export default function NoticeRouter(router = Router()) {
  router.post("/create-notice", Authentication, Authorization, createNotice);
  router.delete("/delete-notice/:id", Authentication, Authorization, deleteNotice);
  router.get("/list-notice/",Authentication, Authorization, listNoticesByUser);
  router.delete("/delete-all/",Authentication, Authorization, deleleAllNotice);
  router.post("/delete-notice-current/",Authentication, Authorization, deleleAllNoticeCurrent);
  return router;
}
