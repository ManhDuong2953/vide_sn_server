import uploadFile from "../../configs/cloud/cloudinary.config";
import Story from "../../models/Story/story.model";
import { ProfileMedia } from "../../models/Users/profile_media.model";
import { Users } from "../../models/Users/user_account.model";

// tạo tin
const createStory = async (req, res) => {
  try {
    const fileImage = req.files.image ? req.files.image[0] : null;
    const fileAudio = req.files.audio ? req.files.audio[0] : null;

    const user_id = req.body?.data?.user_id;
    const { story_privacy } = req.body; 
    if (!user_id || !story_privacy || !fileImage) {
      throw new Error("Thiếu thông tin");
    }
    const mediaImageUrl = await uploadFile(
      fileImage,
      process.env.NAME_FOLDER_STORY
    );
    const mediaAudioUrl = fileAudio
      ? await uploadFile(fileAudio, process.env.NAME_FOLDER_STORY)
      : null;
    const story = new Story({
      user_id: user_id,
      media_link: mediaImageUrl.url,
      audio_link: mediaAudioUrl?.url ?? null,
      story_privacy: story_privacy,
    });
    const result = await story.create();
    if (result) {
      res.status(200).json({ status: true, message: "Đăng tin thành công!" });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "Đã xảy ra lỗi, vui lòng thử lại sau",
        });
    }
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
};
// list stories
const listStory = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id; // Lấy ID người dùng từ body
    const stories = await Story.getAllStory(user_id);

    // Khởi tạo các mảng để chứa thông tin stories và thông tin người dùng
    const storiesWithUserInfo = await Promise.all(
      stories.map(async (story) => {
        const profileUser = await Users.getById(story.user_id);
        const user_avatar = await ProfileMedia.getLatestAvatarById(
          story.user_id
        ); // Gọi hàm để lấy avatar mới nhất

        return {
          story_id: story.story_id,
          media_link: story.media_link,
          audio_link: story.audio_link,
          created_at: story.created_at,
          user_id: story.user_id,
          user_name: profileUser.user_name, // Tên người dùng
          user_avatar: user_avatar, // Avatar của người dùng
          story_privacy: story.story_privacy,
        };
      })
    );

    res.status(200).json({
      status: true,
      data: storiesWithUserInfo,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách story:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
};
// Lấy story theo ID
const storyById = async (req, res) => {
  try {
    const story_id = req.params.id; // Lấy ID story từ params
    const story = await Story.getStoryById(story_id);

    if (!story) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy story",
      });
    }

    const user_id = story?.user_id;

    // Kiểm tra nếu user_id không hợp lệ
    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "Không thể lấy thông tin người dùng cho story này",
      });
    }

    // Lấy thông tin người dùng và avatar liên quan đến story
    const profileUser = await Users.getById(user_id);
    const user_avatar = await ProfileMedia.getLatestAvatarById(user_id);
    const storyWithUserInfo = {
      story_id: story.story_id,
      media_link: story.media_link,
      audio_link: story.audio_link,
      created_at: story.created_at,
      heart_quantity: story.heart_quantity,
      user_id: story.user_id,
      user_name: profileUser?.user_name || "Unknown",
      user_avatar: user_avatar || null,
      story_privacy: story.story_privacy,
    };

    res.status(200).json({
      status: true,
      data: storyWithUserInfo,
    });
  } catch (error) {
    console.error("Lỗi khi lấy story theo ID:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
};

async function fetchUserStories(req, res) {
  const { id } = req.params; // Lấy user_id từ params

  try {
    const storyItem = await Story.getStoryById(id);
    if (!storyItem) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy tin này",
      });
    }
    // Lấy các story của người dùng
    const stories = await Story.getStoriesByUserId(storyItem?.user_id);

    // Nếu không có story nào
    if (!stories.length) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy story cho người dùng này",
      });
    }

    // Lặp qua từng story để lấy thông tin người dùng và avatar
    const storiesWithUserInfo = await Promise.all(stories.map(async (story) => {
      const profileUser = await Users.getById(story.user_id);
      const user_avatar = await ProfileMedia.getLatestAvatarById(story.user_id);
      
      return {
        story_id: story.story_id,
        media_link: story.media_link,
        audio_link: story.audio_link,
        created_at: story.created_at,
        heart_quantity: story.heart_quantity,
        user_id: story.user_id,
        user_name: profileUser?.user_name || "Unknown",
        user_avatar: user_avatar || null,
        story_privacy: story.story_privacy,
      };
    }));

    res.status(200).json({
      status: true,
      data: storiesWithUserInfo,
    });
  } catch (error) {
    console.error("Lỗi khi lấy story của người dùng:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
}
// thả tym tin

const createHeartStory = async (req, res) => {
  try {
    const story_id = req.params.id;
    const user_id = req.body?.data?.user_id;
    const heart = await Story.likeStory(story_id);
    res.status(200).json({ status: true });
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
};
export { createStory, listStory, storyById, createHeartStory,fetchUserStories };
