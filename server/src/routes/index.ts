import { Request, Response, Router } from "express";
import { authenticate } from "../middleware/auth";
import auth from "./auth.route";
import document from "./document.route";
import user from "./user.route";

const router = Router();
router.get("/", authenticate, async (req: Request, res: Response) => {
  return res.sendStatus(200);
});
router.use("/auth", auth);
router.use("/document", document);
router.use("/user", user);

export default router;
