import GroupChannel from "../../models/Group/group_channel.model.js";
import GroupPost from "../../models/Group/group_post.model.js";
import Post from "../../models/Post/post.model.js";
import PostMedia from "../../models/Post/post_media.model.js";
import PostReact from "../../models/Post/react_post.model.js";

const createGroupPost = async (req, res) => {
  const { post_id } = req.body;
  const member_id = req.body?.data?.user_id;
  const group_id = req.params?.group_id;

  try {
    // Kiểm tra các trường bắt buộc
    if (!group_id || !post_id || !member_id) {
      return res.status(400).json({
        status: false,
        message: "Thông tin không được để trống!",
      });
    }

    // Tạo bài đăng mới
    const groupPost = new GroupPost({
      group_id,
      post_id,
      member_id,
      status: 0,
    });
    const group_post_id = await groupPost.create();

    if (!group_post_id) {
      return res.status(400).json({
        status: false,
        message: "Lỗi khi tạo bài đăng nhóm!",
      });
    }

    res.status(200).json({
      status: true,
      group_post_id,
    });
  } catch (error) {
    console.error("Error creating group post:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

const getAllAcceptedGroupPosts = async (req, res) => {
  const group_id = req.params?.group_id;
  try {
    const posts = await GroupPost.getAllGroupPostsAccepted(group_id);

    // Lấy tất cả media cho từng bài viết
    const mediaPromises = posts.map(async (post) => {
      const groupInfo = await GroupChannel.getGroupByGroupId(post.group_id);
      const postContent = await Post.getPostById(post?.post_id);
      const media = await PostMedia.getAllMediaByPostId(post?.post_id);
      const reacts = await PostReact.getAllReactByPost(post?.post_id);
      return {
        group: groupInfo,
        group_post_id: post.group_post_id,
        ...postContent, // Spread thông tin từ bài viết
        reacts,
        media, // Thêm media vào bài viết
      };
    });

    // Đợi tất cả các promise media hoàn thành
    const postsWithMedia = await Promise.all(mediaPromises);
    res.status(200).json({
      status: true,
      data: postsWithMedia,
    });
  } catch (error) {
    console.error("Error fetching accepted group posts:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

const getAllUnapprovedGroupPosts = async (req, res) => {
  const group_id = req.params?.group_id;
  try {
    const posts = await GroupPost.getAllGroupPostsUnapproved(group_id);

    // Lấy tất cả media cho từng bài viết
    const mediaPromises = posts.map(async (post) => {
      const groupInfo = await GroupChannel.getGroupByGroupId(post.group_id);
      const postContent = await Post.getPostById(post?.post_id);
      const media = await PostMedia.getAllMediaByPostId(post?.post_id);
      const reacts = await PostReact.getAllReactByPost(post?.post_id);
      return {
        group: groupInfo,
        group_post_id: post.group_post_id,
        ...postContent, // Spread thông tin từ bài viết
        reacts,
        media, // Thêm media vào bài viết
      };
    });

    // Đợi tất cả các promise media hoàn thành
    const postsWithMedia = await Promise.all(mediaPromises);
    res.status(200).json({
      status: true,
      data: postsWithMedia,
    });
  } catch (error) {
    console.error("Error fetching accepted group posts:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};


const getAllGroupPosts = async (req, res) => {
  const user_id = req.body?.data?.user_id;
  try {
    const posts = await GroupPost.getAllGroupPostJoined(user_id);
    // Lấy tất cả media cho từng bài viết
    const mediaPromises = posts.map(async (post) => {
      const infor_group = await GroupChannel.getGroupByGroupId(post?.group_id);
      const postContent = await Post.getPostById(post?.post_id);
      const media = await PostMedia.getAllMediaByPostId(post?.post_id);
      const reacts = await PostReact.getAllReactByPost(post?.post_id);
      return {
        ...post,
        ...postContent, // Spread thông tin từ bài viết
        group: infor_group,
        reacts,
        media, // Thêm media vào bài viết
      };
    });

    // Đợi tất cả các promise media hoàn thành
    const postsWithMedia = await Promise.all(mediaPromises);
    // Sắp xếp theo `created_at` giảm dần
    postsWithMedia.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    res.status(200).json({
      status: true,
      data: postsWithMedia,
    });
  } catch (error) {
    console.error("Error fetching accepted group posts:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

const acceptGroupPost = async (req, res) => {
  const { group_post_id } = req.body;

  try {
    if (!group_post_id) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu lỗi bất định",
      });
    }

    const isAccepted = await GroupPost.acceptGroupPost(group_post_id);

    if (isAccepted) {
      return res.status(200).json({
        status: true,
        message: "Phê duyệt bài đăng thành công!",
      });
    }

    res.status(400).json({
      status: false,
      message: "Không thể phê duyệt bài đăng nhóm.",
    });
  } catch (error) {
    console.error("Error accepting group post:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

const deleteGroupPost = async (req, res) => {
  const { group_post_id } = req.body;

  try {
    if (!group_post_id) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu lỗi bất định",
      });
    }

    const isDeleted = await GroupPost.deleteGroupPost(group_post_id);

    if (isDeleted) {
      return res.status(200).json({
        status: true,
        message: "Xóa bài đăng thành công!",
      });
    }

    res.status(400).json({
      status: false,
      message: "Không thể xóa bài đăng nhóm.",
    });
  } catch (error) {
    console.error("Error deleting group post:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  }
};

export {
  createGroupPost,
  getAllAcceptedGroupPosts,
  getAllUnapprovedGroupPosts,
  acceptGroupPost,
  deleteGroupPost,
  getAllGroupPosts
};
