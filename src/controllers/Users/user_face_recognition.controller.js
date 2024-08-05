import { UserFaceData } from "../models/userFaceData.model";

// Create user face data
const createUserFaceData = async (req, res) => {
    try {
        const data = req.body;
        const userFaceData = new UserFaceData(data);
        const userFaceDataResponse = await userFaceData.create();
        
        if (userFaceDataResponse == 1) {
            res.status(201).json({ status: true, message: "User face data created successfully" });
        } else {
            throw new Error(userFaceDataResponse);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

// Get user face data by ID
const getUserFaceDataById = async (req, res) => {
    try {
        const userFaceData = await UserFaceData.getById(req.params.id);
        if (userFaceData) {
            res.status(200).json({ status: true, message: 'User face data found', data: userFaceData });
        } else {
            res.status(404).json({ status: false, message: 'User face data not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Get all user face data
const getAllUserFaceData = async (req, res) => {
    try {
        const userFaceData = await UserFaceData.getAll();
        res.status(200).json({ status: true, message: 'User face data list', data: userFaceData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Update user face data
const updateUserFaceData = async (req, res) => {
    try {
        const { media_link } = req.body;
        const userFaceData = new UserFaceData({
            user_id: req.params.id,
            media_link
        });
        const result = await userFaceData.update();
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User face data updated successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error updating user face data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Delete user face data
const deleteUserFaceData = async (req, res) => {
    try {
        const result = await UserFaceData.delete(req.params.id);
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User face data deleted successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error deleting user face data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

export {
    createUserFaceData,
    getUserFaceDataById,
    getAllUserFaceData,
    updateUserFaceData,
    deleteUserFaceData
};
