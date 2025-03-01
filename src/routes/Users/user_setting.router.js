import { Router } from 'express';
import { getUserSettingById, updateUserSetting } from '../../controllers/Users/user_setting.controller.js';
import Authentication from '../../middlewares/authentication/authentication_token.js';
import { Authorization } from '../../middlewares/authorization/authorization_token.js';

// Cấu hình router
const UserSettingRouter = (router = Router()) => {
  router.get('/get-setting',Authentication, Authorization, getUserSettingById); 
  router.put('/update-setting',Authentication, Authorization, updateUserSetting); 

  return router;
};

export default UserSettingRouter;
