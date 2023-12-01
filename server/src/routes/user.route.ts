import { Router } from "express";
import { userController } from "../controllers/user/user.controller";
import { notificationController } from "../controllers/user/notification/notification.controller";
import { authenticate } from "../middleware/auth";
import { userValidator } from "../validators/user.validator";

const router = Router();
router.post("/", userValidator.register, userController.register);
router.get("/all", authenticate, userController.getAllUsers);
router.put("/verify-email/:token", userController.verifyEmail);
router.get("/notification", authenticate, notificationController.getUserNotifications);
router.patch("/notification/:id", authenticate, notificationController.markNotificationAsRead);
router.get("/:id", authenticate, userController.getUser);
router.post("/reset-password", userValidator.resetPassword, userController.resetPassword);
router.put("/password/:token", userValidator.confirmResetPassword, userController.confirmResetPassword);
router.get("/role/:names", authenticate, userController.getUsersByRole);
router.patch("/:id", authenticate, userController.updateUserPersonalInformation);
router.patch("/:id/role", authenticate, userController.updateUserRoles);

export default router;
