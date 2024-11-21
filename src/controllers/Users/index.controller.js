import uploadFile from "../../configs/cloud/cloudinary.config";
import { ProfileMedia } from "../../models/Users/profile_media.model";
import { Users } from "../../models/Users/user_account.model";
import { UserProfile } from "../../models/Users/user_profile.model";
import { UserSetting } from "../../models/Users/user_setting.model";
require("dotenv").config();
export async function getInfoProfileUser(req, res) {
  try {
    const id = req.params.id ?? req.body?.data?.user_id;
    const [data_account, data_profile, data_media, data_setting] =
      await Promise.all([
        Users.getById(id),
        UserProfile.getById(id),
        ProfileMedia.getById(id),
        UserSetting.getById(id),
      ]);

    const getLastMediaLink = (mediaArray, mediaType) =>
      mediaArray
        .filter((media) => media.media_type === mediaType)
        .reduce((_, media) => media.media_link, null);

    res.status(200).json({
      status: true,
      data: {
        ...data_account,
        ...data_profile,
        ...data_setting,
        avatar: getLastMediaLink(data_media, "avatar"),
        cover: getLastMediaLink(data_media, "cover"),
      },
    });
  } catch (error) {
    console.error(error); // Ghi log lỗi để dễ dàng phát hiện và sửa lỗi
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message, // Trả về thông điệp lỗi cho client nếu cần
    });
  }
}
export async function uploadInfoProfileUser(req, res) {
  try {
    const id = req.body?.data?.user_id;
    const { avatar, cover } = req.files || {}; // Sử dụng || {} để đảm bảo không gặp lỗi nếu req.files không tồn tại
    const dataUpdate = req.body;

    // Khởi tạo các đối tượng từ lớp tương ứng
    const user = new Users(dataUpdate);
    const userProfile = new UserProfile(dataUpdate);

    // Hàm trợ giúp để tạo ProfileMedia
    const createProfileMedia = async (file, folderName) => {
      if (!file) return null; // Nếu không có file, không thực hiện upload
      const uploadResult = await uploadFile(file, folderName);
      return new ProfileMedia({
        user_id: id,
        media_type: file.fieldname,
        media_link: uploadResult.url,
      }).create();
    };

    // Cập nhật người dùng và profile người dùng
    const results = await Promise.all([
      user.update(),
      userProfile.update(),
      createProfileMedia(
        avatar ? avatar[0] : null,
        process.env.NAME_FOLDER_USER_AVT
      ),
      createProfileMedia(
        cover ? cover[0] : null,
        process.env.NAME_FOLDER_USER_COVER
      ),
    ]);

    // Kiểm tra kết quả cập nhật
    const allRowsAffected =
      results.slice(0, 2).every((result) => result === 1) && // Kiểm tra kết quả cập nhật user và userProfile
      (results[2] === null || results[2] === 1) && // Kiểm tra kết quả upload avatar (nếu có)
      (results[3] === null || results[3] === 1); // Kiểm tra kết quả upload cover (nếu có)

    if (!allRowsAffected) {
      return res.status(400).json({
        status: false,
        message: "Không thể cập nhật tất cả thông tin người dùng.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật thông tin người dùng thành công!",
    });
  } catch (error) {
    console.error(error); // Ghi log lỗi để dễ dàng phát hiện và sửa lỗi
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message, // Trả về thông điệp lỗi cho client nếu cần
    });
  }
}
