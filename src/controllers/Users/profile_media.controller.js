import { ProfileMedia } from "../../models/Users/profile_media.model.js";

export const getAllProfileMediaByIdUser = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const media = await ProfileMedia.getById(user_id);
    if (!media) {
      res.status(404).json({ status: false });
    }
    res.status(200).json({ status: true, data: media });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};
