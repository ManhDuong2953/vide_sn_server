import ProfileHeart from "../../models/Users/profile_heart.model";

export const createProfileHeart = async (req, res) => {
    try {
        const user_id = req.params?.id;
        const hearted_user_id = req.body?.data?.user_id;
        const profileHeart = new ProfileHeart({
            user_id,
            hearted_user_id
        });
        const result = await profileHeart.create();

        if (result == 1) {
            res.status(201).json({ status: true });
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

export const getProfileHeartsByUserId = async (req, res) => {
    try {
        const user_id  = req.params?.id;
        const hearts = await ProfileHeart.getByUserId(user_id);

        if (hearts) {
            res.status(200).json({ status: true, data: hearts });
        } else {
            res.status(404).json({ status: false, message: "No hearts found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

export const removeProfileHeart = async (req, res) => {
    try {
        const user_id = req.params?.id;
        const hearted_user_id = req.body?.data?.user_id;
        const result = await ProfileHeart.removeHeart(user_id, hearted_user_id);

        if (result == 1) {
            res.status(200).json({ status: true, message: "Bạn đã huỷ yêu thích người dùng này" });
        } else {
            res.status(404).json({ status: false, message: "Heart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};
