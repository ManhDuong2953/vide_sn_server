import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import CryptoJS from "crypto-js";

// Tạo random String với 8 ký tự
export function generateId(prefix) {
  return `${prefix}${crypto.randomBytes(8).toString("hex")}`;
}

// Băm với bcrypt
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export async function hashString(input) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(input, salt);
}

export const compareHash = (string, hash) => {
  return bcrypt.compareSync(string, hash);
};

// Tạo random string với độ dài tùy chỉnh
export function generateRandomString(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 🔹 Khóa bí mật AES (nên lưu trong biến môi trường)
const secretKey = process.env.KEY_AES;

// 🔹 Mã hóa AES
export function encryptAES(text, secretKeyAES = secretKey) {
  return CryptoJS.AES.encrypt(text, secretKeyAES).toString();
}

// 🔹 Giải mã AES
export function decryptAES(cipherText, secretKeyAES = secretKey) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKeyAES);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// 🔹 Mã hóa AES với độ dài chuỗi đầu vào và đầu ra bằng nhau
const iv = CryptoJS.enc.Utf8.parse("00000000000000000000000000000000"); // IV cố định
const secretKeySame = process.env.KEY_AES_SAME;

export function encryptAESSame(text) {
  const encrypted = CryptoJS.AES.encrypt(
    text,
    CryptoJS.enc.Utf8.parse(secretKeySame),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
}

export function decryptAESSame(cipherText) {
  const decrypted = CryptoJS.AES.decrypt(
    cipherText,
    CryptoJS.enc.Utf8.parse(secretKeySame),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// 🔹 Mã hóa RSA
export function encryptWithPublicKey(data, publicKey) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString("hex");
}

export function decryptWithPrivateKey(encryptedData, privateKey) {
  try {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, "hex")).toString();
  } catch (error) {
    console.error("Decryption failed:", error.message);
    return null;
  }
}

// ✅ ✅ ✅ KẾT HỢP AES + RSA ✅ ✅ ✅

// ✅ Mã hóa AES + RSA trả về 1 chuỗi duy nhất
export function hybridEncrypt(data, publicKey) {
  const aesKey = crypto.randomBytes(32); // AES-256
  const iv = crypto.randomBytes(16); // IV ngẫu nhiên

  // Mã hóa dữ liệu bằng AES
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");

  // Mã hóa khóa AES bằng RSA
  const encryptedAESKey = crypto.publicEncrypt(publicKey, aesKey).toString("base64");

  // ✅ Trả về 1 chuỗi duy nhất, nối với dấu `|`
  return `${encryptedAESKey}|${iv.toString("base64")}|${encryptedData}`;
}

// ✅ Giải mã chuỗi duy nhất
export function hybridDecrypt(encryptedString, privateKey) {
  try {
    // Tách chuỗi thành các phần
    const [encryptedAESKey, iv, encryptedData] = encryptedString.split("|");

    // Giải mã khóa AES bằng RSA
    const aesKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedAESKey, "base64"));

    // Giải mã dữ liệu bằng AES
    const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, Buffer.from(iv, "base64"));
    let decryptedData = decipher.update(encryptedData, "base64", "utf8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
  } catch (error) {
    console.error("Hybrid decryption failed:", error.message);
    return null;
  }
}
