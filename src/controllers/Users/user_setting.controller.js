import { UserSetting } from "../../models/Users/user_setting.model";

// Get a user setting by ID
const getUserSettingById = async (req, res) => {
    try {
        const userSetting = await UserSetting.getById(req.body?.data?.user_id);
        if (userSetting) {
            res.status(200).json({ status: true, data: userSetting });
        } else {
            res.status(404).json({ status: false, message: 'Lỗi bất định vì không xác định được người dùng' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};


// Update a user setting
const updateUserSetting = async (req, res) => {
    try {
        const { post_privacy, story_privacy, dark_theme } = req.body;
        const userSetting = new UserSetting({
            user_id: req.body?.data?.user_id,
            post_privacy,
            story_privacy,
            dark_theme
        });
        console.log({
            user_id: req.body?.data?.user_id,
            post_privacy,
            story_privacy,
            dark_theme
        });
        
        const result = await userSetting.update();
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User setting updated successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error updating user setting' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};



export {
    getUserSettingById,
    updateUserSetting,
};
