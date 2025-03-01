import { createToken, decodeRefreshToken, deleteToken } from "../../controllers/Token/token.controller.js";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";

const TokenRouter = (router) => {
    router.delete('/delete', Authentication, Authorization, deleteToken);
    router.post('/create', createToken);
    router.post('/decode-refresh-token', decodeRefreshToken);
    return router;
}
export default TokenRouter;