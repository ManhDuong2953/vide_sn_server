import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Configure multer for file upload handling
const upload = multer({ dest: 'uploads/' });

const uploadFile = async (file, folder) => {
    try {
        // Đặt các tùy chọn chuyển đổi
        const options = {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { width: 1000, crop: "scale" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        };

        // Upload file với các tùy chọn chuyển đổi
        let result = await cloudinary.uploader.upload(file.path, options);

        return {
            url: result.secure_url,
            fileType: result.resource_type // Cloudinary tự xác định loại file
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadFile;