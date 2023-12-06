import catchAsync from "../../../middleware/catch-async";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import assigneeService from "../../../services/assignee.service";
import notificationService from "../../../services/notification.service";

class AssigneeController {
  /**
   * Gets all documents assigned to a specific officer
   */
  public getAssigneeDocuments = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;

    const documents = await assigneeService.getDocumentsOfAssignee(parseInt(id));

    if (documents === null) return res.sendStatus(404);

    return res.status(200).json(documents);
  });

  public setAssignee = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    if (!req.user) return res.sendStatus(401);

    const { documentId } = req.params;
    const { userId } = req.body;

    const assigneeId = await assigneeService.updateAssignee(userId ? parseInt(userId) : null, parseInt(documentId));
    await notificationService.notifyOwnerNewAssignee(parseInt(documentId), userId);
    await notificationService.notifyCiscoMemberAssignee(parseInt(documentId), userId, parseInt(req.user.id));

    return res.status(200).json({ assigneeId });
  });
}
const assigneeController = new AssigneeController();

export { assigneeController };
