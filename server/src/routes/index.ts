import { Request, Response, Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import RoleEnum from "../types/enums/role-enum";
import auth from "./auth.route";
import document from "./document.route";
import user from "./user.route";

const router = Router();
// TODO: Refactor this to appropriate role
router.get("/", authenticate, authorize([RoleEnum.CISCO_ADMIN]), async (req: Request, res: Response) => {
  return res.sendStatus(200);
});
router.use("/auth", auth);
router.use("/document", document);
router.use("/user", user);

export default router;
