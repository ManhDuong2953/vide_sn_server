import db from '../../configs/database/database.config.js';
import { Users } from '../Users/user_account.model.js';


import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class Token extends Users {
    constructor(data) {
        super(data);
        this.token = data.token;
        this.token_key_encode = data.token_key_encode;
        this.created_at = data.created_at;
        this.token_expiration = data.token_expiration;
    }

    generateAccessToken() {
        return jwt.sign({
            "user_id": this.user_id,
            "user_role": this.user_role
        }, SECRET_KEY, { expiresIn: parseInt(process.env.TIME_EXPIRED_ACCESS_TOKEN) * 60 });
    }

    generateRefreshToken(key) {
        return jwt.sign({
            "user_id": this.user_id,
            "user_role": this.user_role
        }, key, { expiresIn: parseInt(process.env.TIME_EXPIRED_REFRESH_TOKEN) * 24 * 60 * 60 });
    }


    //create refresh token
    async create(refreshToken, key_encode) {
        try {
            if (await Token.checkRefreshTokenByUserID(this.user_id).user_id !== null) {
                await Token.delete(this.user_id);
            }

            const createdAt = new Date();
            const tokenExpiration = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000); // Thời
            const createTokenQuery = `
                                    INSERT INTO Token (user_id, token, token_key_encode ,token_expiration, created_at)
                                    VALUES (?, ?, ?, ?, ?);
                                    `;
            const [result] = await db.execute(createTokenQuery, [
                this.user_id,
                refreshToken,
                key_encode,
                tokenExpiration,
                createdAt
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async checkRefreshTokenByUserID(user_id) {
        try {
            const checkRefreshTokenQuery = `SELECT * FROM Token WHERE user_id = ?`;
            const [rows] = await db.query(checkRefreshTokenQuery, [user_id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    static async checkRefreshTokenByToken(token) {
        try {
            const checkRefreshTokenByTokenQuery = `SELECT * FROM Token WHERE token = ?`;
            const [rows] = await db.query(checkRefreshTokenByTokenQuery, [token]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    static async validate(token, secret_key = SECRET_KEY) {
        try {

            const decoded = jwt.verify(token, secret_key);
            // Return decoded token if valid
            return {
                valid: true,
                msg: 'Token is validated',
                decoded
            };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // Decode token to get user_id
                const decodedToken = jwt.decode(token);
                const userId = decodedToken?.user_id;

                // Fetch user and return
                const user = userId ? await Users.getById(userId) : null;
                return {
                    valid: false,
                    msg: error.name,
                    data: user || 'User not found'
                };
            } else {
                return {
                    valid: false,
                    msg: error.name
                };
            }
        }
    }

    // Method to delete a token
    static async delete(user_id) {
        try {
            const deleteTokenQuery = `
                DELETE FROM Token WHERE user_id = ?;
            `;
            const [result] = await db.execute(deleteTokenQuery, [user_id]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export {
    Token
}
