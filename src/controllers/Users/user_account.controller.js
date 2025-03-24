import { ProfileMedia } from "../../models/Users/profile_media.model.js";
import { Users } from "../../models/Users/user_account.model.js";
import { UserProfile } from "../../models/Users/user_profile.model.js";
import { UserSetting } from "../../models/Users/user_setting.model.js";
//Users role
// Create a user
const createUsers = async (req, res) => {
    try {
        const data = req.body;
        const users = new Users(data);
        const user_id = await users.create();
        if (user_id) {
            new ProfileMedia({
                user_id: user_id,
                media_type: 'avatar',
                media_link:
                    data.user_gender === "male" ?
                        'https://res.cloudinary.com/der2ygna3/image/upload/v1730082664/users/avatar/knji2r1nic8gvzm371hn.jpg'
                        : (
                            data.user_gender = 'female' ?
                                'https://res.cloudinary.com/der2ygna3/image/upload/v1730082728/users/avatar/lwzxbad64rsmvnx7xocs.jpg'
                                :
                                'https://res.cloudinary.com/der2ygna3/image/upload/v1730082743/users/avatar/yn8p6j26gmfdcp70ngrz.jpg'
                        )
            }).create();
            new ProfileMedia({
                user_id: user_id,
                media_type: 'cover',
                media_link: 'https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg'
            }).create();

            new UserProfile({
                user_id,
                ...data
            }).create();

            const userSetting = new UserSetting({
                user_id: user_id,
                ...data
            });
            await userSetting.create();

            res.status(201).json({ status: true, message: "Tài khoản đã được tạo thành công" });
        } else {
            throw new Error(usersResponse);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

const createUsersBySocialAccount = async (req, res) => {
    try {
        const data = req.body;
        const users = new Users({ ...data, user_id: `uid_${data?.user_id}` });
        const user_id = await users.create();

        if (user_id) {
            new ProfileMedia({
                user_id: user_id,
                media_type: data?.media?.media_type,
                media_link: data?.media?.media_link
            }).create();
            new ProfileMedia({
                user_id: user_id,
                media_type: 'cover',
                media_link: 'https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg'
            }).create();
            new UserProfile({
                user_id: user_id
            }).create();
            const userSetting = new UserSetting({
                user_id: user_id
            });
            await userSetting.create();
            res.status(201).json({ status: true });
        } else {
            throw new Error(usersResponse);
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { user_email, user_password, type_account } = req.body;
        const user = await Users.login(user_email, user_password, type_account);
        if (user) {
            res.status(200).json({ status: true, data: user });
        } else {
            res.status(401).json({ status: false, message: 'Email hoặc mật khẩu không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        console.log(user);
        
        if (user) {
            res.status(200).json({ status: true, data: user });
        } else {
            res.status(200).json({ status: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.getAll();
        res.status(200).json({ status: true, message: 'Danh sách người dùng', data: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ status: false, message: 'Thiếu ID người dùng' });
        }

        // Kết hợp user_id với các trường trong req.body
        const user = new Users({ user_id, ...req.body });

        const result = await user.update();

        if (result > 0) {
            return res.status(200).json({ status: true, message: 'Người dùng đã được cập nhật' });
        } else {
            return res.status(400).json({ status: false, message: 'Lỗi khi cập nhật người dùng' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ status: false, message: 'Lỗi hệ thống khi cập nhật người dùng' });
    }
};

// Update user password
const updateUserPassword = async (req, res) => {
    try {
        const { user_password, user_email } = req.body;
        const user = new Users({ user_email: user_email });
        const result = await user.updatePassword(user_password);
        if (result > 0) {
            res.status(200).json({ status: true, message: 'Mật khẩu đã được cập nhật' });
        } else {
            res.status(400).json({ status: false, message: 'Lỗi khi cập nhật mật khẩu' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const result = await Users.delete(req.params.id);
        if (result > 0) {
            res.status(200).json({ status: true, message: 'Người dùng đã được xóa' });
        } else {
            res.status(400).json({ status: false, message: 'Lỗi khi xóa người dùng' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

export {
    createUsers,
    createUsersBySocialAccount,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserPassword,
    deleteUser
};
