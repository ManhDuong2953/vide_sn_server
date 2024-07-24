import nodemailer from 'nodemailer';

const sendMail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        service: "Gmail",
        port: 587,
        auth: {
            user: "leaveease.info@gmail.com",
            pass: "ivokdaxqactvrmey",
        },
    });
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #4CAF50;">Vibe Social</h2>
                <p>Chào bạn,</p>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Mã OTP của bạn là:</p>
                <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; border: 1px dashed #4CAF50; border-radius: 5px; text-align: center; background-color: #f9f9f9;">
                    ${otp}
                </div>
                <p>Mã này có hiệu lực trong vòng 1 phút. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,</p>
                <p>Đội ngũ Vibe Social</p>
                <div style="margin-top: 20px; font-size: 12px; color: #999;">
                    <p>Nếu bạn gặp vấn đề, vui lòng liên hệ với chúng tôi tại <a href="https://www.facebook.com/manhduong2953">Dương Mạnh</a>.</p>
                </div>
            </div>
        </div>
    `;

    const message = {
        from: '"Vibe Social" <javier.marquardt@ethereal.email>', // Định dạng đúng cho `from`
        to: email,
        subject: "Xác thực tài khoản - Vibe Account",
        html: html,
    };

    try {
        const result = await transporter.sendMail(message);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendMail;


// const nodemailer = require("nodemailer");

// const sendMail = async (email, subject, html ) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     service: "Gmail",
//     auth: {
//         user: "mailto:leaveease.info@gmail.com",
//         pass: "ivokdaxqactvrmey",
//       },
//   });

//   const message = {
//     from: "CÔNG TY  LEAVEEASE",
//     to: email,
//     subject: subject,
//     html: html,
//   };
//   const result = await transporter.sendMail(message);
//   return result;
// };

// module.exports = sendMail;