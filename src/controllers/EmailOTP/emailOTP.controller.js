import { EmailOTP } from "../../models/EmailOTP/emailOTP.model";

// Tạo mã OTP
const createOTPEmail = async (req, res) => {
    try {
        const data = req.body;
        const otp = new EmailOTP(data);
        await otp.create();
        res.status(201).json({ status: true, message: "Mã OTP đã được gửi tới email của bạn, hãy kiểm tra hòm thư" });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Xác thực mã OTP
const verifyOTPEmail = async (req, res) => {
    try {
        const data = req.body;
        const dataEmailOTP = await EmailOTP.find(data.user_email, data.input_code_otp);
        console.log(dataEmailOTP);
        if (dataEmailOTP.user_email !== undefined) {
            const otp = new EmailOTP(dataEmailOTP);
            if (await otp.verifyAndDelete(data.input_code_otp)) {
               return res.status(200).json({ "status": true, "message": "Xác thực Email thành công!" })
            }
        }
        throw new Error("Email hoặc Mã OTP không hợp lệ");
    } catch (error) {
        res.status(400).send(error)
    }
}

export {
    createOTPEmail, verifyOTPEmail
}