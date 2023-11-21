import catchAsync from "../../../middleware/catch-async";
import { Request, Response } from "express";
import notificationService from "../../../services/notification.service";
import { Notification } from "../../../db/models/notification.model";

class NotificationController {
  public getUserNotifications = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const notifications = await notificationService.getNotifications(parseInt(req.user.id));

    res.json(notifications);
  });

  public markNotificationAsRead = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const targetNotificationId = req.params.id;

    const targetNotification = await Notification.findByPk(targetNotificationId);

    if (targetNotification === undefined || targetNotification === null) {
      return res.status(404).json({ error: `"Notification with id: ${targetNotificationId} does not exist.` });
    } else if (targetNotification.userId !== parseInt(req.user.id)) {
      return res
        .status(403)
        .json({ error: `"Notification with id: ${targetNotificationId} does not belong to your userId.` });
    } else {
      targetNotification.isRead = true;
      targetNotification.save();
      return res.status(200).json(targetNotification);
    }
  });
}
const notificationController = new NotificationController();

export { notificationController };
