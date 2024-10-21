import db from "../../configs/database/database.config";
import { encryptWithPublicKey } from "../../ultils/crypto";
import { UserKeysPair } from "../Users/user_keys_pair.model";

class Message {
  constructor(data) {
    this.messenger_id = data.messenger_id;
    this.content_text_encrypt = data.content_text_encrypt;
    this.content_text_encrypt_by_owner = data.content_text_encrypt_by_owner;
    this.content_type = data.content_type;
    this.reply_text = data.reply_text;
    this.sender_id = data.sender_id;
    this.receiver_id = data.receiver_id;
    this.name_file = data.name_file || null;
    this.created_at = data.created_at;
  }

  async create(text) {
    try {
      const publicKeyReceiver = await UserKeysPair.getPublicKeyReceiver(
        this.receiver_id
      );

      const publicKeySender = await UserKeysPair.getPublicKeyReceiver(
        this.sender_id
      );
      const textEnCryptoRSA = encryptWithPublicKey(
        text,
        publicKeyReceiver.public_key
      );
      const textEnCryptoRSAForSender = encryptWithPublicKey(
        text,
        publicKeySender.public_key
      );
      const createMessageQuery = `
        INSERT INTO PrivateMessage (
          content_text_encrypt,
          content_text_encrypt_by_owner,
          content_type,
          reply_text,
          name_file,
          sender_id,
          receiver_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      const [result] = await db.execute(createMessageQuery, [
        textEnCryptoRSA,
        textEnCryptoRSAForSender,
        this.content_type,
        this.reply_text,
        this.name_file,
        this.sender_id,
        this.receiver_id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error creating message: ", error);
      throw error;
    }
  }

  static async getMessage(user_id, friend_id) {
    try {
      const getMessageQuery = `
        SELECT 
          messenger_id,
          content_text_encrypt,
          content_text_encrypt_by_owner,
          content_type,
          name_file,
          reply_text,
          sender_id,
          receiver_id,
          created_at
        FROM PrivateMessage
        WHERE 
          (sender_id = ? AND receiver_id = ?)
          OR 
          (sender_id = ? AND receiver_id = ?)
        ORDER BY created_at ASC;
      `;

      const [result] = await db.execute(getMessageQuery, [
        user_id,
        friend_id,
        friend_id,
        user_id,
      ]);

      return result;
    } catch (error) {
      console.error("Error fetching messages: ", error);
      throw error;
    }
  }

  static async getConversation(user_id) {
    try {
      // Truy vấn để lấy danh sách bạn bè đã có hội thoại với user hiện tại
      const getConversationsQuery = `
                                      SELECT 
                                          u.user_id AS friend_id,
                                          u.user_name AS friend_name,
                                          pm.media_link AS friend_avatar,
                                          msg.content_text_encrypt,
                                          msg.content_type,
                                          msg.name_file,
                                          msg.content_text_encrypt_by_owner,
                                          msg.created_at AS last_message_time,
                                          msg.sender_id,
                                          msg.receiver_id,
                                          msg.messenger_id
                                      FROM (
                                          SELECT 
                                              *
                                          FROM 
                                              PrivateMessage pm
                                          WHERE 
                                              (pm.sender_id = ? OR pm.receiver_id = ?)
                                          AND 
                                              (pm.created_at, pm.messenger_id) IN (
                                                  SELECT 
                                                      MAX(created_at) AS max_created_at,
                                                      MAX(messenger_id) AS max_messenger_id
                                                  FROM PrivateMessage 
                                                  WHERE (sender_id = pm.sender_id AND receiver_id = pm.receiver_id) 
                                                    OR (sender_id = pm.receiver_id AND receiver_id = pm.sender_id)
                                                  GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id)
                                              )
                                      ) AS msg
                                      JOIN user u 
                                        ON (u.user_id = msg.sender_id OR u.user_id = msg.receiver_id) 
                                        AND u.user_id != ?
                                      LEFT JOIN (
                                          SELECT pm1.user_id, pm1.media_link
                                          FROM ProfileMedia pm1
                                          WHERE pm1.media_type = 'avatar'
                                          AND pm1.created_at = (
                                              SELECT MAX(created_at) 
                                              FROM ProfileMedia 
                                              WHERE user_id = pm1.user_id
                                              AND media_type = 'avatar'
                                              LIMIT 1
                                          )
                                      ) AS pm
                                        ON pm.user_id = u.user_id
                                      ORDER BY last_message_time DESC;

    `;

      const [conversations] = await db.execute(getConversationsQuery, [
        user_id,
        user_id,
        user_id,
      ]);
      return conversations;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Message;
