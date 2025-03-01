import Friend from "../../models/Users/friend.model.js";
import { Users } from "../../models/Users/user_account.model.js";

// Tạo yêu cầu kết bạn
export const createFriendRequest = async (req, res) => {
  try {
    const requestor_id = req.body?.data?.user_id;
    const receiver_id = req.params.id;

    // Kiểm tra sự tồn tại của người gửi và người nhận
    const [checkRequestor, checkReceiver] = await Promise.all([
      Users.getById(requestor_id),
      Users.getById(receiver_id),
    ]);

    if (checkRequestor?.user_id && checkReceiver?.user_id) {
      // Kiểm tra xem lời mời kết bạn đã tồn tại chưa
      const existingRequest = await Friend.checkExistingRequest(
        requestor_id,
        receiver_id
      );

      if (existingRequest?.receiver_id) {
        res
          .status(409)
          .json({ status: false, message: "Lời mời kết bạn đã tồn tại" });
      } else {
        const friendRequest = new Friend({
          requestor_id,
          receiver_id,
        });
        const result = await friendRequest.create();

        if (result === 1) {
          res
            .status(201)
            .json({ status: true, message: "Lời đề nghị kết bạn đã được gửi" });
        } else {
          throw new Error("Lỗi bất định");
        }
      }
    } else {
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Chấp nhận lời mời kết bạn
export const acceptFriend = async (req, res) => {
  try {
    const requestor_id = req.params.id;
    const receiver_id = req.body?.data?.user_id;

    // Kiểm tra sự tồn tại của người gửi và người nhận
    const [checkRequestor, checkReceiver] = await Promise.all([
      Users.getById(requestor_id),
      Users.getById(receiver_id),
    ]);

    if (checkRequestor?.user_id && checkReceiver?.user_id) {
      const result = await Friend.updateStatus(requestor_id, receiver_id, 1);

      if (result === 1) {
        res.status(200).json({
          status: true,
          message: "Các bạn đã trở thành bạn bè, hãy trò chuyện ngay",
        });
      } else {
        res.status(404).json({ status: false, message: "Lỗi bất định" });
      }
    } else {
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Lấy danh sách bạn bè
export const getFriends = async (req, res) => {
  try {
    const user_id = req.params.id;

    // Kiểm tra sự tồn tại của người dùng
    const checkUser = await Users.getById(user_id);

    if (checkUser?.user_id) {
      const friends = await Friend.getFriends(user_id);

      if (friends.length > 0) {
        res.status(200).json({ status: true, data: friends });
      } else {
        res.status(200).json({ status: false });
      }
    } else {
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Lấy tất cả các yêu cầu kết bạn bởi ID của người nhận
export const getAllRequestorsByReceiverId = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;

    // Kiểm tra sự tồn tại của người dùng
    const checkUser = await Users.getById(user_id);

    if (checkUser?.user_id) {
      const requests = await Friend.getAllRequestorsByReceiverId(user_id);

      if (requests.length > 0) {
        res.status(200).json({ status: true, data: requests });
      } else {
        res.status(200).json({ status: true });
      }
    } else {
      throw new Error("Người dùng không tồn tại");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Lấy tất cả các yêu cầu kết bạn bởi ID của người nhận
export const getListSuggest = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;

    // Kiểm tra sự tồn tại của người dùng
    const listSuggest = await Friend.getSuggestions(user_id);

    if (listSuggest) {
      res.status(200).json({ status: true, data: listSuggest });
    } else {
      res.status(404).json({ status: true, data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Lấy tất cả các yêu cầu kết bạn bởi ID của người nhận
export const getDobFriends = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;

    // Kiểm tra sự tồn tại của người dùng
    const dobList = await Friend.getBobFriends(user_id);

    if (dobList) {
      res.status(200).json({ status: true, data: dobList });
    } else {
      res.status(404).json({ status: true, data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Kiểm tra bạn bè chưa
export const statusFriend = async (req, res) => {
  try {
    const { requestor_id, receiver_id } = req.body;

    // Kiểm tra sự tồn tại của người gửi và người nhận
    const [checkRequestor, checkReceiver] = await Promise.all([
      Users.getById(requestor_id),
      Users.getById(receiver_id),
    ]);

    if (checkRequestor?.user_id && checkReceiver?.user_id) {
      const result = await Friend.checkExistingRequest(
        requestor_id,
        receiver_id
      );

      if (result.requestor_id) {
        res.status(200).json({ status: true, data: result });
      } else {
        res.status(200).json({ status: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Kiểm tra bạn bè chưa
export const getCountManualFriend = async (req, res) => {
  try {
    const { friend_id } = req.params;

    const owner_id = req.body?.data?.user_id;

    // Kiểm tra sự tồn tại của người gửi và người nhận
    const [checkRequestor, checkReceiver] = await Promise.all([
      Users.getById(friend_id),
      Users.getById(owner_id),
    ]);

    if (checkRequestor?.user_id && checkReceiver?.user_id) {
      const result = await Friend.getMutualFriend(friend_id, owner_id);
      if (result?.mutual_friend_count) {
        res.status(200).json({ status: true, data: result });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};

// Xóa bạn bè
export const deleteFriend = async (req, res) => {
  try {
    const { requestor_id, receiver_id } = req.body;
    const owner_id = req.body?.data?.user_id;

    if (owner_id === requestor_id || owner_id === receiver_id) {
      // Kiểm tra sự tồn tại của người gửi và người nhận
      const [checkRequestor, checkReceiver] = await Promise.all([
        Users.getById(requestor_id),
        Users.getById(receiver_id),
      ]);

      if (checkRequestor?.user_id && checkReceiver?.user_id) {
        const result = await Friend.deleteFriend(requestor_id, receiver_id);

        if (result === 1) {
          res.status(200).json({ status: true, message: "Bạn bè đã được xóa" });
        } else {
          res.status(404).json({ status: false });
        }
      } else {
        throw new Error("Người dùng không tồn tại");
      }
    } else {
      throw new Error("Người dùng không có thẩm quyền");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message ?? error });
  }
};
