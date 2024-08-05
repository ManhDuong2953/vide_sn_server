import { deleteToken } from "../../controllers/Token/token.controller";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization } from "../../middlewares/authorization/authorization_token";

 const TokenRouter = (router) => {
    router.delete('/delete',Authentication, Authorization, deleteToken);
    return router;
}
export default TokenRouter;