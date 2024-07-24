import sendMail from "../../configs/emailSTMT/email.config";
import { Users } from "../../models/Users/users.model";

// Tạo người dùng
const createUsers = async (req, res) => {
    try {
        const data = req.body;
        const users = new Users(data);
        const usersResponse = await users.create();
        // 
        if(usersResponse == 1){
            res.status(201).json({"status": 200, "message": "Tài khoản đã được tạo thành công"});
        } else {
            throw new Error(usersResponse)
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export {
    createUsers
}