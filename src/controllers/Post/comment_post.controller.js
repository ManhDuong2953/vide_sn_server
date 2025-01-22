import uploadFile from "../../configs/cloud/cloudinary.config.js";
import PostComment from "../../models/Post/comment_post.model.js";
import Post from "../../models/Post/post.model.js";

// Viết bình luận
const createCommentPostById = async (req, res) => {
  const post_id = req.params.id;
  const file = req.files?.[0]; // Kiểm tra xem có file không
  const comment_text = req.body?.comment_text || null;
  let media_type = req.body?.media_type || null;
  const commenting_user_id = req.body?.data?.user_id;
  let media_link = null; // Đặt mặc định là null

  if (file) {
    try {
      const media_link_url = await uploadFile(
        file,
        process.env.NAME_FOLDER_POST
      );
      media_link = media_link_url?.url;
      if (media_type.startsWith("image/")) {
        media_type = "image";
      } else if (media_type.startsWith("video/")) {
        media_type = "video";
      } else {
        throw new Error("Unsupported media type");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return res
        .status(500)
        .json({ status: false, message: "File upload failed" });
    }
  }

  try {
    const comment = new PostComment({
      post_id,
      commenting_user_id,
      comment_text,
      media_link, // Sẽ là null nếu không có file
      media_type,
    });

    const result = await comment.create();

    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      res
        .status(404)
        .json({ status: false, message: "Failed to create comment" });
    }
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

// Lấy danh sách bình luận và sub-comment theo post_id
const listCommentByPost = async (req, res) => {
  const post_id = req.params.id;

  try {
    if (!post_id) {
      return res.status(400).json({ status: false, message: "Không thể xác định bài viết, có thể nó không còn tồi tại trên hệ thống" });
    }
    const comments = await PostComment.getCommentsWithSubComments(post_id);
    res.status(200).json({ status: true, data: comments });

  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

const heartCommentByPost = async (req, res) => {
  const comment_id = req.params.id;

  try {
    const comments = await PostComment.updateCommentHeart(comment_id);
    if (comments) {
      res.status(200).json({ status: true });
    } else {
      res.status(404).json({ status: false });
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

const deleteCommentPost = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { post_id } = req.body;
    const my_id = req.body.data?.user_id;
    const user_id = (await Post.getPostById(post_id))?.user_id;
    const commenting_user_id = (
      await PostComment.getCommentByCommentId(comment_id)
    )?.commenting_user_id;

    if (my_id === commenting_user_id || my_id === user_id) {
      const result = await PostComment.deleteComment(comment_id);

      if (result) {
        return res.status(200).json({ status: true });
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Failed to delete comment" });
      }
    } else {
      return res.status(403).json({
        status: false,
        message: "Bạn không có quyền xóa bình luận này",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

export {
  createCommentPostById,
  listCommentByPost,
  heartCommentByPost,
  deleteCommentPost,
};
