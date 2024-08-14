import crypto from "crypto";
import bcrypt from 'bcrypt';
require("dotenv").config();

//Tạo random String với 8 ký tự
export function generateId(prefix) {
  return `${prefix}${crypto.randomBytes(8).toString('hex')}`;
}




//Tạo hàm băm với bcrypt
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);


export async function hashString(input) {
  // Chờ đợi để tạo salt
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  // Chờ đợi để tạo hash
  const hashedString = await bcrypt.hash(input, salt);
  return hashedString;
}

// So sánh hàm băm
export const compareHash = (string, hash) => {
  return bcrypt.compareSync(string, hash);
}

//Tạo randomString với length ký tự
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

//Tạo randomString với length ký tự
export function generateKeyPlayFair() {
  const characters = 'ABCDEFGHKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = 10;

  for (let i = 0; i < charactersLength; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}



//Tạo mã hóa playfair
// Tạo khóa Playfair
function createPlayfairKey() {
  const keyword = process.env.KEY_PLAYFAIR.toUpperCase().replace(/J/g, 'I');
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const usedChars = new Set(keyword);
  const keyMatrix = [...keyword, ...alphabet].filter((c, i, self) => self.indexOf(c) === i);

  return Array.from({ length: 5 }, (_, i) => keyMatrix.slice(i * 5, i * 5 + 5));
}

// Tìm vị trí trong ma trận
function findPosition(char, keyMatrix) {
  for (let row = 0; row < 5; row++) {
    let col = keyMatrix[row].indexOf(char);
    if (col !== -1) return [row, col];
  }
}

// Mã hóa Playfair
export function playfairEncrypt(plainText) {
  const keyMatrix = createPlayfairKey();
  plainText = plainText.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let cipherText = '';

  for (let i = 0; i < plainText.length; i += 2) {
    let [a, b] = [plainText[i], plainText[i + 1] || 'X'];
    if (a === b) b = 'X';
    let [row1, col1] = findPosition(a, keyMatrix);
    let [row2, col2] = findPosition(b, keyMatrix);

    if (row1 === row2) {
      cipherText += keyMatrix[row1][(col1 + 1) % 5] + keyMatrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      cipherText += keyMatrix[(row1 + 1) % 5][col1] + keyMatrix[(row2 + 1) % 5][col2];
    } else {
      cipherText += keyMatrix[row1][col2] + keyMatrix[row2][col1];
    }
  }

  return cipherText;
}

// Giải mã Playfair
export function playfairDecrypt(cipherText) {
  const keyMatrix = createPlayfairKey();
  let plainText = '';

  for (let i = 0; i < cipherText.length; i += 2) {
    let [a, b] = [cipherText[i], cipherText[i + 1]];
    let [row1, col1] = findPosition(a, keyMatrix);
    let [row2, col2] = findPosition(b, keyMatrix);

    if (row1 === row2) {
      plainText += keyMatrix[row1][(col1 + 4) % 5] + keyMatrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      plainText += keyMatrix[(row1 + 4) % 5][col1] + keyMatrix[(row2 + 4) % 5][col2];
    } else {
      plainText += keyMatrix[row1][col2] + keyMatrix[row2][col1];
    }
  }

  return plainText;
}

