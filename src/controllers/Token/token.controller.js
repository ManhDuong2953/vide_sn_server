import { Token } from "../../models/Token/token.model";

// Xóa token
const deleteToken = async (req, res) => {
    try {
        const { user_id } = req.body.data;
        console.log(user_id);
        
        if (!user_id) {
            throw new Error("Thiếu thông tin tài khoản");
        }

        const tokenExists = await Token.checkRefreshToken(user_id);
        if (tokenExists) {
            await Token.delete(user_id);
            res.status(204).json({status: true});
        } else {
            throw new Error("Không tìm thấy token cho người dùng này");
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

export {
    deleteToken
};
