import { UserSetting } from "../../models/userSetting.model";

// Create a user setting
const createUserSetting = async (req, res) => {
    try {
        const data = req.body;
        const userSetting = new UserSetting(data);
        const userSettingResponse = await userSetting.create();
        
        if (userSettingResponse == 1) {
            res.status(201).json({ status: true, message: "User setting created successfully" });
        } else {
            throw new Error(userSettingResponse);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

// Get a user setting by ID
const getUserSettingById = async (req, res) => {
    try {
        const userSetting = await UserSetting.getById(req.params.id);
        if (userSetting) {
            res.status(200).json({ status: true, message: 'User setting found', data: userSetting });
        } else {
            res.status(404).json({ status: false, message: 'User setting not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Get all user settings
const getAllUserSettings = async (req, res) => {
    try {
        const userSettings = await UserSetting.getAll();
        res.status(200).json({ status: true, message: 'User settings list', data: userSettings });
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
            user_id: req.params.id,
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

// Delete a user setting
const deleteUserSetting = async (req, res) => {
    try {
        const result = await UserSetting.delete(req.params.id);
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User setting deleted successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error deleting user setting' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

export {
    createUserSetting,
    getUserSettingById,
    getAllUserSettings,
    updateUserSetting,
    deleteUserSetting
};
