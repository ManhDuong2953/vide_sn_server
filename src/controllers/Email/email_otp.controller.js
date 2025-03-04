import { EmailOTP } from "../../models/Email/email_otp.model.js";
import { Users } from "../../models/Users/user_account.model.js";

// Tạo mã OTP
const createOTPEmail = async (req, res) => {
    try {
        const data = req.body;
        if (!(await Users.isExistEmail(data?.user_email))) {
            const otp = new EmailOTP(data);
            await otp.create("code");
            res.status(201).json({ status: true, message: "Mã OTP đã được gửi tới email của bạn, hãy kiểm tra hòm thư" });
        } else {
            throw new Error("Email của bạn đã được sử dụng hoặc không hợp lệ!")
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error })
    }
}

// Tạo mã OTP
const createOTPEmailExisted = async (req, res) => {
    try {
        const data = req.body;
        if (await Users.isExistEmail(data?.user_email)) {
            const otp = new EmailOTP(data);
            await otp.create("code");
            res.status(201).json({ status: true, message: "Mã OTP đã được gửi tới email của bạn, hãy kiểm tra hòm thư" });
        } else {
            throw new Error("Email của bạn không hợp lệ!")
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error })
    }
}

// Tạo mã OTP
const createOTPEmailLink = async (req, res) => {
    try {
        const data = req.body;
        if (await Users.isExistEmail(data?.user_email)) {
            const otp = new EmailOTP(data);
            await otp.create("link");
            res.status(201).json({ status: true, message: "Kiểm tra đường dẫn đổi mật khẩu trong hòm thư" });
        } else {
            throw new Error("Email của bạn không hợp lệ!")
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error })
    }
}

// Xác thực mã OTP
const verifyOTPEmail = async (req, res) => {
    try {
        const data = req.body;
        const dataEmailOTP = await EmailOTP.find(data.user_email, data.input_code_otp);
        if (dataEmailOTP) {
            const otp = new EmailOTP(dataEmailOTP);
            const isVerified = await otp.verifyAndDelete(data.input_code_otp)
            if (isVerified === true) {
                res.status(200).json({ status: true, message: "Xác thực Email thành công!" })
            } else {
                throw new Error(isVerified);
            }
        } else {
            throw new Error("Mã xác thực không đúng|")
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message ?? error })
    }
}





export {
    createOTPEmail, verifyOTPEmail, createOTPEmailExisted, createOTPEmailLink
}