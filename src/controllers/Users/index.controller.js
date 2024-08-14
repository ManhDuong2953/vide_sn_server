import { ProfileMedia } from "../../models/Users/profile_media.model";
import { Users } from "../../models/Users/user_account.model";
import { UserProfile } from "../../models/Users/user_profile.model";

export async function getInfoProfileUser(req, res) {
    try {
        const id = req.params.id ?? req.body?.data?.user_id;
        const [data_account, data_profile, data_media] = await Promise.all([
            Users.getById(id),
            UserProfile.getById(id),
            ProfileMedia.getById(id),
        ]);

        res.status(200).json({
            status: true,
            data: {
                ...data_account,
                ...data_profile,
                avatar: data_media.find(media => media.media_type === 'avatar').media_link ?? null,
                cover: data_media.find(media => media.media_type === 'cover').media_link ?? null,
            }

        });
    } catch (error) {
        console.error(error); // Ghi log lỗi để dễ dàng phát hiện và sửa lỗi
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message // Trả về thông điệp lỗi cho client nếu cần
        });
    }
}