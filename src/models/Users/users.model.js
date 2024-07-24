import db from "../../configs/database/database.config";
import sendMail from "../../configs/emailSTMT/email.config";
import { generateId, hashString } from "../../ultils/crypto";
const nodemailer = require("nodemailer");

class Users {
    constructor(data) {
        this.user_id = data.user_id || generateId("USER_");
        this.user_name = data.user_name;
        this.user_nickname = data.user_nickname || this.user_name.toLowerCase() + generateId("_@_");
        this.user_email = data.user_email;
        this.user_password = data.user_password;
        this.user_status = data.user_status || 1;
        this.created_at = data.created_at || Date.now();
        this.user_role = data.user_role || 0;
    }

    async create() {
        try {
            const createUserQuery = "INSERT INTO User (user_id, user_name, user_nickname, user_email, user_password, user_status, user_role) VALUES (?, ?, ?, ?, ?, ?, ?);"
            const result = await db.execute(createUserQuery, [
                this.user_id,
                this.user_name,
                this.user_nickname,
                this.user_email,
                hashString(this.user_password),
                this.user_status,
                this.user_role,
            ]);
            return result.affectedRows;
        } catch (error) {
            return false;
        }
    }

}


export {
    Users
}