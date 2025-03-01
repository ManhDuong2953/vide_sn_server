import Post from "../../models/Post/post.model.js";
import PostReact from "../../models/Post/react_post.model.js";
import Friend from "../../models/Users/friend.model.js";
import { sendNoticeToFriends } from "../../ultils/socket_notice.js";

// Thả tim bài viết
const createReactPostById = async (req, res) => {
  const post_id = req.params.id;
  const { react } = req.body;
  const user_id = req.body?.data?.user_id;
  try {
    const reactPost = new PostReact({
      post_id,
      user_id,
      react,
    });
    const ownerPost = await Post.getOwnerPostById(post_id);

    const result = await reactPost.create();

    if (result) {
      //gửi thông báo cho bạn bè

      await sendNoticeToFriends(
        user_id,
        [ownerPost],
        "đã bày tỏ cảm xúc với bài viết của bạn.",
        "/post/" + post_id
      );

      return res.status(200).json({ status: true });
    } else {
      res.status(404).json({ status: false });
    }
  } catch (error) {
    console.error("Error creating react:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

const deleteReactByUserID = async (req, res) => {
  const user_id = req.body?.data?.user_id;
  const post_id = req.params.id;
  try {
    const posts = await PostReact.deleteReact(user_id, post_id); // Call the model method to get posts
    if (posts) {
      res.status(200).json({ status: true });
    } else {
      res.status(404).json({ status: false });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
    });
  }
};

export { createReactPostById, deleteReactByUserID };
