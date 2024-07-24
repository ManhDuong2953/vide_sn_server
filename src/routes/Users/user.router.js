import { createUsers } from "../../controllers/Users/user.controller";

export const UserRouter = (router) => {
    router.post('/signup', createUsers)
    return router;
}