import { generateKeyPairSync } from "crypto";
import db from "../../configs/database/database.config";
import { decryptAES, encryptAES } from "../../ultils/crypto";

class UserKeysPair {
  constructor(data) {
    this.user_id = data.user_id;
    this.public_key = data.public_key;
    this.private_key_encrypt = data.private_key_encrypt;
  }

  //Tạo cặp khoá
  static async create(user_id, code) {
    try {
      // Create user_keys_pair record in database
      const existingKeyPair = await this.getKeyPair(user_id);

      if (!existingKeyPair?.user_id) {
        const { publicKey, privateKey } = generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: { type: "spki", format: "pem" },
          privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });


        const privateKeyEncode = encryptAES(privateKey, code);
        const createKeyPairQuery =
          "INSERT INTO UserKeysPair (user_id, public_key, private_key_encrypt) VALUES(?,?,?)";

        const [result] = await db.execute(createKeyPairQuery, [
          user_id,
          publicKey,
          privateKeyEncode,
        ]);

        return result.affectedRows > 0;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Lấy cặp khoá
  static async getKeyPair(user_id) {
    try {
      const findUserQuery = "SELECT * FROM UserKeysPair WHERE user_id = ?;";
      const [rows] = await db.execute(findUserQuery, [user_id]);

      // Log the result of the query

      // Check if rows exist and return the first one
      if (rows.length > 0) {
        return rows[0];
      } else {
        console.log("No key pair found for user_id:", user_id);
        return null;
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }


  //Xoá cặp khoá
  // Lấy cặp khoá
  static async deleteKeysPair(user_id) {
    try {
      const deleteUserQuery = "DELETE FROM UserKeysPair WHERE user_id = ?;";
      const [rows] = await db.execute(deleteUserQuery, [user_id]);

      // Log the result of the query

      // Check if rows exist and return the first one
      if (rows.length > 0) {
        return rows[0];
      } else {
        console.log("No key pair found for user_id:", user_id);
        return null;
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  // Giải mã và lấy khoá bí mật
  static async checkPrivateKey(user_id, code) {
    try {
      const keyPair = await this.getKeyPair(user_id);
      
      if (keyPair) {
          const privateKeyDecode = decryptAES(keyPair.private_key_encrypt, code);
          console.log("Key pair: ", privateKeyDecode);

        if (privateKeyDecode !== null) {
          return {
            private_key: privateKeyDecode,
          };
        }
      }
      return null;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

export { UserKeysPair };