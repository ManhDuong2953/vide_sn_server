import { v2 as cloudinary } from 'cloudinary';
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadFile = async (file, folder) => {
    try {
        // Kiểm tra loại file dựa trên MIME type
        const mimeType = file.mimetype;

        // Thiết lập resource_type dựa trên loại file
        let resourceType = 'auto';  // Mặc định Cloudinary sẽ tự phát hiện
        if (!mimeType.startsWith('image/') && !mimeType.startsWith('video/')) {
            resourceType = 'raw';  // Dùng 'raw' cho các tệp không phải ảnh hoặc video
        }

        // Tùy chọn upload
        const options = {
            folder: folder,
            resource_type: resourceType,  // Sử dụng auto hoặc raw dựa trên loại file
            transformation: [
                { quality: "auto" },  // Tự động tối ưu chất lượng nếu là ảnh hoặc video
                { fetch_format: "auto" }  // Tự động chuyển đổi định dạng nếu cần
            ]
        };

        // Upload file lên Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error) {
                    console.error('Error uploading file:', error);
                    return reject(error);
                }
                resolve(result);
            });

            // Chuyển buffer thành stream và upload
            require('stream').Readable.from(file.buffer).pipe(uploadStream);
        });

        return {
            url: result.secure_url,
            fileType: result.resource_type
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadFile;
