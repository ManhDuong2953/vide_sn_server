import { Router } from 'express';
import { getUserSettingById, updateUserSetting } from '../../controllers/Users/user_setting.controller';

// Cấu hình router
const UserSettingRouter = (router = Router()) => {
  router.get('/get-setting/:id', getUserSettingById); 
  router.put('/update-setting/:id', updateUserSetting); 

  return router;
};

export default UserSettingRouter;
