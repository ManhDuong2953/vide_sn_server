import { UserKeysPair } from "../../models/Users/user_keys_pair.model";

const checkExistKeyPair = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const result = await UserKeysPair.getKeyPair(user_id);

    if (result) {
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({ status: false  , message: 'Người dùng chưa tạo khoá, vui lòng nhập Mã xác thực'});
    }
    // Gửi phản hồi về cho client
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: "Đã xảy ra lỗi, vui lòng thử lại sau" });
  }
};

const createKeyPair = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const code = req.body?.code;
    const result = await UserKeysPair.create(user_id, code);
    if (result) {
      res.status(201).json({ status: true, message: "Tạo khoá thành công" });
    } else {
      res
        .status(400)
        .json({
          status: false,
          message: "Tạo khoá thất bại, thử lại với mã khác",
        });
    }
    // Gửi phản hồi về cho client
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Đã xảy ra lỗi, vui lòng thử lại sau" });
  }
};

const checkSecretDeCryptoPrivateKey = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const code = req.body?.code;
    console.log(code);
    
    const result = await UserKeysPair.checkPrivateKey(user_id, code);
    
    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      res.status(400).json({ status: false, message: "Mã khoá sai" });
    }
    // Gửi phản hồi về cho client
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Đã xảy ra lỗi, vui lòng thử lại sau" });
  }
};


const deleteKeysPair = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;

    const result = await UserKeysPair.deleteKeysPair(user_id);
    
    if (result) {
      res.status(200).json({ status: true });
    } 
    // Gửi phản hồi về cho client
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Đã xảy ra lỗi, vui lòng thử lại sau" });
  }
};



const checkKeysPairReceiver = async (req, res) => {
  try {
    const { receiver_id } = req.params || undefined;
    
    if (receiver_id) {
      const isHasKeysPairReceiver = await UserKeysPair.isHasKeysPairReceiver(
        receiver_id
      );
      if (isHasKeysPairReceiver) {
        console.log(">>>>>>>>>>>>>>>>>:", isHasKeysPairReceiver);
        return res.status(200).json({ status: true });
      } else {
        return res.status(200).json({ status: false });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Failed to create message" });
  }
};


export { checkExistKeyPair, checkKeysPairReceiver, createKeyPair, checkSecretDeCryptoPrivateKey, deleteKeysPair };
