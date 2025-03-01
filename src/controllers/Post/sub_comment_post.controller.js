import uploadFile from "../../configs/cloud/cloudinary.config.js";
import Post from "../../models/Post/post.model.js";
import SubPostComment from "../../models/Post/sub_comment_post.model.js";

// Tạo bình luận cấp 2
const createSubCommentByCommentId = async (req, res) => {
  const comment_id = req.params.id; // Lấy comment_id từ URL params

  const file = req.files?.[0]; // Kiểm tra xem có file không
  const comment_text = req.body?.comment_text || null;
  let media_type = req.body?.media_type || null;
  const replying_user_id = req?.body?.data?.user_id;
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
    // Khởi tạo đối tượng SubPostComment
    const subComment = new SubPostComment({
      comment_id,
      replying_user_id,
      comment_text,
      media_link, // Có thể là null nếu không có file
      media_type,
    });

    // Tạo sub-comment
    const result = await subComment.create();

    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      res.status(404).json({ status: false, message: "Comment not created" });
    }
  } catch (error) {
    console.error("Error creating sub-comment:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

// Lấy danh sách các bình luận cấp 2 theo comment_id
const getSubCommentsByCommentId = async (req, res) => {
  const comment_id = req.params.id; // Lấy comment_id từ URL params

  try {
    const subComments = await SubPostComment.getByCommentId(comment_id);

    if (subComments.length > 0) {
      res.status(200).json({ status: true, data: subComments });
    } else {
      res.status(404).json({ status: false, message: "No sub-comments found" });
    }
  } catch (error) {
    console.error("Error fetching sub-comments:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

const heartSubCommentByPost = async (req, res) => {
  const comment_id = req.params.id;

  try {
    const comments = await SubPostComment.updateSubCommentHeart(comment_id);

    if (comments.length > 0) {
      res.status(200).json({ status: true });
    } else {
      res.status(404).json({ status: false});
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};


const deleteSubCommentPost = async (req, res) => {
  try {
    const sub_comment_id = req.params.id;
    const { post_id } = req.body;
    const my_id = req.body.data?.user_id;
    const user_id = (await Post.getPostById(post_id))?.user_id;
    const replying_user_id = (
      await SubPostComment.getBySubCommentId(sub_comment_id)
    )?.replying_user_id;

    if (my_id === replying_user_id || my_id === user_id) {
      const result = await SubPostComment.deleteSubComment(sub_comment_id);

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


export { createSubCommentByCommentId, getSubCommentsByCommentId , heartSubCommentByPost, deleteSubCommentPost};
