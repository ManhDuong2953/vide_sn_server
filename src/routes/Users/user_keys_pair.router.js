import { Router } from 'express';
import Authentication from '../../middlewares/authentication/authentication_token';
import { Authorization } from '../../middlewares/authorization/authorization_token';
import { checkExistKeyPair, checkSecretDeCryptoPrivateKey, createKeyPair, deleteKeysPair } from '../../controllers/Users/user_keys_pair.controller';

// Cấu hình router
const UserKeysPairRouter = (router = Router()) => {
    //Đăng ký khoá 
    router.post('/register', Authentication, Authorization, createKeyPair);
    //Kiểm tra khoá
    router.get('/is_exist_keys_pair', Authentication, Authorization, checkExistKeyPair);
    //Lấy khoá bí mật
    router.post('/get_private_key', Authentication, Authorization, checkSecretDeCryptoPrivateKey);
    // Xoá cặp khoá
    router.delete('/delete_keys_pair', Authentication, Authorization, deleteKeysPair);

    return router;
};

export default UserKeysPairRouter;
