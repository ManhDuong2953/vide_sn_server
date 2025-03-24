import { authToken, createToken, deleteToken } from "../../controllers/Token/token.controller.js";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";

const TokenRouter = (router) => {
    router.delete('/delete', Authentication, Authorization, deleteToken);
    router.post('/create', createToken);
    router.get('/auth-token', Authentication, Authorization, authToken);
    return router;
}
export default TokenRouter;