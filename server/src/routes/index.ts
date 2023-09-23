import { Request, Response, Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import RoleEnum from "../types/enums/role-enum";
import auth from "./auth.route";
import document from "./document.route";

const router = Router();
router.get("/", authenticate, authorize([RoleEnum.SUPERADMIN]), async (req: Request, res: Response) => {
  return res.sendStatus(200);
});
router.use("/auth", auth);
router.use("/document", document);

export default router;
