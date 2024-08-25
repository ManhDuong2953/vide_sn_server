import FriendBlock from "../../models/Users/friend_block.model";
import { Users } from "../../models/Users/user_account.model";

// Chặn bạn bè
export const blockFriend = async (req, res) => {
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
                const blockRequest = new FriendBlock({ requestor_id, receiver_id });
                const result = await blockRequest.block();

                if (result === 1) {
                    res.status(200).json({ status: true, message: "Bạn đã chặn người dùng thành công" });
                } else {
                    throw new Error("Lỗi bất định");
                }
            } else {
                throw new Error("Người dùng không tồn tại");
            }
        } else {
            throw new Error("Người dùng không đúng");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};

// Bỏ chặn bạn bè
export const unblockFriend = async (req, res) => {
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
                const result = await FriendBlock.unblock(requestor_id, receiver_id);

                if (result === 1) {
                    res.status(200).json({ status: true, message: "Bạn đã bỏ chặn người dùng thành công" });
                } else {
                    throw new Error("Lỗi bất định");
                }
            } else {
                throw new Error("Người dùng không tồn tại");
            }
        } else {
            throw new Error("Người dùng không đúng");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message ?? error });
    }
};
