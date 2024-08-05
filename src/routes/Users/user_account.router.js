import { Router } from 'express';
import {
    createUsers,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserPassword,
    deleteUser,
    createUsersBySocialAccount
} from "../../controllers/Users/user_account.controller";
import Authentication from '../../middlewares/authentication/authentication_token';

const UserAccountRouter = (router = Router()) => {
    router.post('/signup', createUsers); // Đăng ký
    router.post('/social-network/signup', createUsersBySocialAccount); // Đăng ký bằng tài khoản mạng xã hội
    router.post('/login', loginUser); // Đăng nhập
    router.get('/is-existed/:id', getUserById); // Kiểm tra sự tồn tại của tài khoản bằng id 
    router.put('/reset-password', updateUserPassword); // Đổi password
    //Authentication
    router.get('/all', getAllUsers); //lấy toàn bộ thông tin tài khoản
    router.get('/info/:id', Authentication, getUserById); // Lấy thông tin tài khoản bằng id
    router.put('/update/:id', Authentication, updateUser); // Sửa thông tin tài khoản
    router.delete('/delete/:id', Authentication, deleteUser); // Xóa tài khoản

    return router;
};

export default UserAccountRouter;
    