import db from "../../configs/database/database.config.js";
import { generateId } from "../../ultils/crypto.js";

class TransactionDetail {
  constructor(data) {
    this.transaction_id = data.transaction_id;
    this.transaction_hash = data.transaction_hash;
    this.buyer_id = data.buyer_id;
    this.seller_id = data.seller_id;
    this.buyer_address = data.buyer_address;
    this.seller_address = data.seller_address;
    this.amount = data.amount;
    this.product_id = data.product_id;
    this.status = data.status ?? true;
  }

  async create() {
    try {
      const id = generateId("trans_");
      const insertQuery = `
        INSERT INTO TransactionDetail (transaction_id, transaction_hash, buyer_id, seller_id, buyer_address, seller_address, amount, product_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const [result] = await db.execute(insertQuery, [
        id,
        this.transaction_hash,
        this.buyer_id,
        this.seller_id,
        this.buyer_address,
        this.seller_address,
        this.amount,
        this.product_id,
        this.status,
      ]);
      return result.affectedRows > 0 ? id : false;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return false;
    }
  }

  static async getByTransactionId(transactionId) {
    try {
      const selectQuery = `SELECT * FROM TransactionDetail WHERE transaction_id = ?;`;
      const [result] = await db.execute(selectQuery, [transactionId]);
      return result?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
    }
  }
}

class UserGLBFile {
  constructor(data) {
    (this.id = data.id), (this.user_id = data.user_id);
    this.transaction_id = data.transaction_id;
    this.glb_file_link = data.glb_file_link;
  }

  async create() {
    try {
      const id = generateId("uglb_");
      const insertQuery = `
        INSERT INTO UserGLBFiles (id, user_id, transaction_id, glb_file_link)
        VALUES (?, ?, ?, ?);
      `;
      const [result] = await db.execute(insertQuery, [
        id,
        this.user_id,
        this.transaction_id,
        this.glb_file_link,
      ]);
      return result.affectedRows > 0 ? id : false;
    } catch (error) {
      console.error("Error creating UserGLBFile:", error);
      return false;
    }
  }

  static async getByUserId(userId) {
    try {
      const selectQuery = `SELECT * FROM UserGLBFiles WHERE user_id = ?;`;
      const [result] = await db.execute(selectQuery, [userId]);
      return result;
    } catch (error) {
      console.error("Error fetching GLB files:", error);
      return [];
    }
  }

  static async getById(id) {
    try {
      const selectQuery = `SELECT * FROM UserGLBFiles WHERE id = ?;`;
      const [result] = await db.execute(selectQuery, [id]);
      return result?.[0];
    } catch (error) {
      console.error("Error fetching GLB files:", error);
      return [];
    }
  }
}

export { TransactionDetail, UserGLBFile };
