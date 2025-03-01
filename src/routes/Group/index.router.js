import { Router } from "express";
import express from 'express';
import GroupChannelRouter from "./group_channel.router.js";
import GroupMemberRouter from "./group_member.router.js";
import GroupPostRouter from "./group_post.router.js";

export const GroupsRouter = (router = Router()) => {
  router.use("/channel", GroupChannelRouter(express.Router()));
  router.use("/members", GroupMemberRouter(express.Router()));
  router.use("/posts", GroupPostRouter(express.Router()));
  return router;
};
