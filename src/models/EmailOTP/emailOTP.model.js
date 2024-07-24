import db from "../../configs/database/database.config";
import sendMail from "../../configs/emailSTMT/email.config";
import { generateRandomString } from "../../ultils/crypto";

class EmailOTP {

    constructor(data) {
        this.user_email = data.user_email;
        this.otp_code = data.otp_code || generateRandomString(5);
        this.created_at = new Date(); // Thời gian tạo là thời gian hiện tại
        this.otp_expiration = new Date(this.created_at.getTime() + 1 * 60 * 1000); // Thời gian hết hạn là 1 phút sau thời gian tạo
        this.is_verified = data.is_verified || false;
    }

    // Phương thức tạo OTP
    async create() {
        try {
            const createOTPQuery = "INSERT INTO EmailOTP (user_email, otp_code, otp_expiration, is_verified, created_at) VALUES (?, ?, ?, ?, ?);";
            const result = await db.execute(createOTPQuery, [
                this.user_email,
                this.otp_code,
                this.otp_expiration,
                this.is_verified,
                this.created_at,
            ]);
            await sendMail(this.user_email, this.otp_code);
            return result.affectedRows;
        } catch (error) {
            console.error('Error creating OTP:', error);
            return false;
        }
    }

    static async find(user_email, input_code_otp) {
        try {
            const findOTPQuery = "SELECT * FROM EmailOTP WHERE user_email = ? AND otp_code = ?;";
            const [result] = await db.execute(findOTPQuery, [
                user_email,
                input_code_otp,
            ]);
            return result[0];
        } catch (error) {
            console.error('Error creating OTP:', error);
            return false;
        }
    }

    // Phương thức kiểm tra hạn OTP và xóa nếu hết hạn
    async isExpiredAndDelete() {
        const now = new Date();
        if (now > new Date(this.otp_expiration)) {
            await this.delete();
            return true;
        }
        return false;
    }

    // Phương thức cập nhật trạng thái
    async updateStatus(is_verified) {
        try {
            const updateStatusQuery = "UPDATE EmailOTP SET is_verified = ? WHERE user_email = ? AND otp_code = ?;";
            const result = await db.execute(updateStatusQuery, [
                is_verified,
                this.user_email,
                this.otp_code
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating OTP status:', error);
            return false;
        }
    }

    // Phương thức xóa OTP
    async delete() {
        try {
            const deleteOTPQuery = "DELETE FROM EmailOTP WHERE user_email = ? AND otp_code = ?;";
            const result = await db.execute(deleteOTPQuery, [
                this.user_email,
                this.otp_code
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error deleting OTP:', error);
            return false;
        }
    }

    // Phương thức xác thực email và kiểm tra OTP
    async verifyAndDelete(inputOtpCode) {
        try {
            if (await this.isExpiredAndDelete()) {
                console.log('OTP has expired and has been deleted.');
                return false;
            }
            console.log(this.otp_code, inputOtpCode);

            if (this.otp_code === inputOtpCode) {
                await this.updateStatus(true);
                await this.delete();
                console.log('Email verified and OTP deleted successfully.');
                return true;
            } else {
                console.log('Invalid OTP code.');
                return false;
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            return false;
        }
    }
}

export {
    EmailOTP
}