import express from 'express';
import UserRouter from './Users/index.router';
import EmailOTPRouter from './Email/email_otp.router';
import TokenRouter from './Token/token.router';
import MessengerRouter from './Message/messenger.router';


export default function RouterAPI(app) {
    app.use('/users', UserRouter(express.Router()));
    app.use('/otp', EmailOTPRouter(express.Router()));
    app.use('/token', TokenRouter(express.Router()));
    app.use('/messenger', MessengerRouter(express.Router()));
    return app;
}
