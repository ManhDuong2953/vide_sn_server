import { UserProfile } from "../../models/userProfile.model";

// Create a user profile
const createUserProfile = async (req, res) => {
    try {
        const data = req.body;
        const userProfile = new UserProfile(data);
        const userProfileResponse = await userProfile.create();
        
        if (userProfileResponse == 1) {
            res.status(201).json({ status: true, message: "User profile created successfully" });
        } else {
            throw new Error(userProfileResponse);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

// Get a user profile by ID
const getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.getById(req.params.id);
        if (userProfile) {
            res.status(200).json({ status: true, message: 'User profile found', data: userProfile });
        } else {
            res.status(404).json({ status: false, message: 'User profile not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Get all user profiles
const getAllUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.getAll();
        res.status(200).json({ status: true, message: 'User profiles list', data: userProfiles });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Update a user profile
const updateUserProfile = async (req, res) => {
    try {
        const { date_of_birth, user_address, user_school, user_slogan } = req.body;        
        const userProfile = new UserProfile({
            user_id: req.params.id,
            date_of_birth,
            user_address,
            user_school,
            user_slogan
        });
        const result = await userProfile.update();  
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User profile updated successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error updating user profile' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

// Delete a user profile
const deleteUserProfile = async (req, res) => {
    try {
        const result = await UserProfile.delete(req.params.id);
        if (result > 0) {
            res.status(200).json({ status: true, message: 'User profile deleted successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error deleting user profile' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message ?? error });
    }
};

export {
    createUserProfile,
    getUserProfileById,
    getAllUserProfiles,
    updateUserProfile,
    deleteUserProfile
};
