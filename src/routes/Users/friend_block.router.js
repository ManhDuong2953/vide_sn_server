import { Router } from 'express';
import { blockFriend, unblockFriend } from '../../controllers/Users/friend_block.controller';
import Authentication from '../../middlewares/authentication/authentication_token';
import { Authorization } from '../../middlewares/authorization/authorization_token';

// Cấu hình router
const FriendBlockRouter = (router = Router()) => {
    // Chặn bạn bè
    router.post('/block', Authentication, Authorization, blockFriend);

    // Bỏ chặn bạn bè
    router.delete('/unblock', Authentication, Authorization, unblockFriend);

    return router;
};

export default FriendBlockRouter;
