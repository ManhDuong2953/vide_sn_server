import crypto from "crypto";
import bcrypt from 'bcrypt';

export function generateId(prefix) {
  return `${prefix}${crypto.randomBytes(8).toString('hex')}`;
}
// Number of salt rounds
const SALT_ROUNDS = 10;

export async function hashString(input) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedString = await bcrypt.hash(input, salt);
  return hashedString;
}

export const compareHash = (string, hash) => {
  return bcrypt.compareSync(string, hash);
}

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