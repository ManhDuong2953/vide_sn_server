import { v2 as cloudinary } from "cloudinary";
import { generateId } from "../../ultils/crypto.js";
import dotenv from "dotenv";
dotenv.config();
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFile = async (file, folder) => {
  try {
    const mimeType = file.mimetype;
    let resourceType = "auto";

    if (
      !mimeType.startsWith("image/") &&
      !mimeType.startsWith("video/") &&
      !mimeType.startsWith("application/pdf")
    ) {
      resourceType = "raw";
    }

    const options = {
      folder: folder,
      resource_type: resourceType,
      public_id: generateId("file_"), // Lấy tên gốc không đuôi mở rộng
      ...(resourceType === "auto" && {
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
      }),
    };

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            console.error("Error uploading file:", error);
            return reject(error);
          }
          resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const generateTemporaryUrl = (
  publicId,
  expirySeconds = 3600,
  resourceType = "image"
) => {
  return cloudinary.url(publicId, {
    sign_url: true, // Kích hoạt chữ ký
    resource_type: resourceType,
    type: "authenticated",
    expires_at: Math.floor(Date.now() / 1000) + expirySeconds, // Thời gian hết hạn
  });
};

/**
 * 3️⃣ Xóa file trên Cloudinary bằng publicId
 */
export const deleteFile = async (publicId, resourceType = "auto") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Lỗi xóa file:", error);
    throw error;
  }
};

export default uploadFile;
