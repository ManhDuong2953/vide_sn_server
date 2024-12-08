import { Token } from "../../models/Token/token.model";
import {
  decryptAES,
  encryptAES,
  generateRandomString,
} from "../../ultils/crypto";

// Delete token
const deleteToken = async (req, res) => {
  try {
    const { user_id } = req.body.data;
    if (!user_id) {
      throw new Error("Thiếu thông tin tài khoản");
    }
    const tokenExists = await Token.checkRefreshTokenByUserID(user_id);
    if (tokenExists) {
      await Token.delete(user_id);
    }
    res.clearCookie("accessToken"); // Thay đổi tên cookie tùy thuộc vào cấu hình của bạn
    res.clearCookie("key_refresh_token_encode"); // Thay đổi tên cookie tùy thuộc vào cấu hình của bạn
    res.clearCookie("refreshToken"); // Thay đổi tên cookie tùy thuộc vào cấu hình của bạn
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Create token
const createToken = async (req, res) => {
  try {
    const { user_id, key_refresh_token_encode } = req.body;
    if (!user_id || !key_refresh_token_encode) {
      throw new Error("Thiếu thông tin tài khoản");
    }
    const { token } = await Token.checkRefreshTokenByUserID(user_id);
    if (token) {
      //Giải mã key Token từ người dùng gửi
      const KeyRefreshTokenDecode = decryptAES(key_refresh_token_encode);

      //Kiểm tra validate của token đó cũng như key người dùng gửi
      const isValidated = await Token.validate(token, KeyRefreshTokenDecode);
      const infoUser = isValidated.data ?? isValidated.decoded;
      const randomKeyRefreshToken = generateRandomString();

      const key_encode = encryptAES(randomKeyRefreshToken);
      const new_refresh_token = new Token(infoUser).generateRefreshToken(
        randomKeyRefreshToken
      );

      if (
        (await new Token(infoUser).create(
          new_refresh_token,
          randomKeyRefreshToken
        )) === 1
      ) {
        const new_access_token = new Token(infoUser).generateAccessToken();
        res.cookie("key_refresh_token_encode", key_encode, {
          maxAge:
            parseInt(process.env.TIME_EXPIRED_REFRESH_TOKEN) *
            24 *
            60 *
            60 *
            1000,
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        res.cookie("accessToken", new_access_token, {
          maxAge: parseInt(process.env.TIME_EXPIRED_ACCESS_TOKEN) * 60 * 1000,
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        res.cookie("refreshToken", new_refresh_token, {
          maxAge:
            parseInt(process.env.TIME_EXPIRED_REFRESH_TOKEN) *
            24 *
            60 *
            60 *
            1000,
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        res.status(201).json({ status: true });
      }
    } else {
      throw new Error("Token này không tồn tại");
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Decode refresh token
const decodeRefreshToken = async (req, res) => {
  try {
    const { refresh_token, key_refresh_token_encode } = req.body;

    if (!refresh_token || !key_refresh_token_encode) {
      throw new Error("Thiếu thông tin tài khoản");
    }
    const tokenExists = await Token.checkRefreshTokenByToken(refresh_token);

    if (tokenExists !== null) {
      //Giải mã key Token từ người dùng gửi
      const KeyRefreshTokenDecode = decryptAES(key_refresh_token_encode);

      //Kiểm tra validate của token đó cũng như key người dùng gửi
      const isValidated = await Token.validate(
        refresh_token,
        KeyRefreshTokenDecode
      );

      res.status(200).json({
        status: true,
        data: {
          user_id: isValidated.decoded.user_id ?? isValidated.data.user_id,
        },
      });
    } else {
      res.status(400).json({ status: false, message: "Token không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export { deleteToken, createToken, decodeRefreshToken };
