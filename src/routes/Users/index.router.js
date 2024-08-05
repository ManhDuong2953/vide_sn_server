import { Router } from 'express';
import UserAccountRouter from './user_account.router';
import express from 'express';
import Authentication from '../../middlewares/authentication/authentication_token';
import { Authorization } from '../../middlewares/authorization/authorization_token';
import { getInfoProfileUser } from '../../controllers/Users/index.controller';

const UserRouter = (router = Router()) => {
    router.use("/account", UserAccountRouter(express.Router()));
    router.get('/info-profile/:id', Authentication, Authorization, getInfoProfileUser);
    router.get('/owner-profile', Authentication, Authorization, getInfoProfileUser);
    return router;
};

export default UserRouter;
    