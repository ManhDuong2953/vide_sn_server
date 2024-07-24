import express from 'express';
import { UserRouter } from './Users/user.router';
import { EmailOTPRouter } from './EmailOTP/emailOTP.router';
export default function RouterAPI(app) {
    app.use('/users', UserRouter(express.Router()));
    app.use('/otp', EmailOTPRouter(express.Router()));
    return app;
}
