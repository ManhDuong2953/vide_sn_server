import { Router } from 'express';
import Authentication from '../../middlewares/authentication/authentication_token.js';
import { Authorization } from '../../middlewares/authorization/authorization_token.js';
import { createProfileHeart, getProfileHeartsByUserId, removeProfileHeart } from '../../controllers/Users/profile_heart.controller.js';

// Cấu hình router
const ProfileHeartRouter = (router = Router()) => {
    router.get('/list/:id', getProfileHeartsByUserId );
    router.post('/create/:id', Authentication, Authorization, createProfileHeart);
    router.delete('/delete/:id', Authentication, Authorization, removeProfileHeart );

    return router;
};

export default ProfileHeartRouter;
