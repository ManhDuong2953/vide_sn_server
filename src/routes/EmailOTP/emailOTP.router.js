import { createOTPEmail, verifyOTPEmail } from "../../controllers/EmailOTP/emailOTP.controller";

export const EmailOTPRouter = (router) => {
    router.post('/create', createOTPEmail);
    router.post('/verify', verifyOTPEmail);
    return router;
}