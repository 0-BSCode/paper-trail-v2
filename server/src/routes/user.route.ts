import { Router } from "express";
import { userController } from "../controllers/user/user.controller";
import { notificationController } from "../controllers/user/notification/notification.controller";
import { authenticate } from "../middleware/auth";
import { userValidator } from "../validators/user.validator";

const router = Router();
router.post("/", userValidator.register, userController.register);
router.put("/verify-email/:token", userController.verifyEmail);
router.get("/notification", authenticate, notificationController.getUserNotifications);
router.patch("/notification/:id", authenticate, notificationController.markNotificationAsRead);
router.get("/:id", authenticate, userController.getUser);
router.post("/reset-password", userValidator.resetPassword, userController.resetPassword);
router.put("/password/:token", userValidator.confirmResetPassword, userController.confirmResetPassword);
// TODO (Bryan): Pass array for CISCO_MEMBER and CISCO_ADMIN
router.get("/role/:name", userController.getUserByRole);
router.get("/role/:id", authenticate, userController.getUser);

export default router;
