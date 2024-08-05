import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloud/cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Tên thư mục trong Cloudinary
    format: async (req, file) => 'png', // Định dạng file tải lên (có thể là 'jpg', 'png', etc.)
    public_id: (req, file) => file.originalname,
  },
});

const parser = multer({ storage: storage });

export default parser;
