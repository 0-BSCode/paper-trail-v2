import catchAsync from "../../../middleware/catch-async";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import documentService from "../../../services/document.service";
import notificationService from "../../../services/notification.service";
import { Document } from "../../../db/models/document.model";

class StatusController {
  public getStatus = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;
    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));

    if (document === null) return res.sendStatus(404);

    return res.status(200).json(document.status);
  });
  /**
   * Gets all documents of a specific status
   */
  public getAll = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const { status } = req.body;

    const documents = await Document.findAll({
      where: {
        status
      }
    });

    if (documents === null) return res.sendStatus(404);

    return res.status(200).json(documents);
  });

  public updateStatus = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;
    const { status } = req.body;

    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));

    if (document === null) return res.sendStatus(404);

    if (status !== undefined && status !== null) document.status = status;
    await document.save();

    return res.status(200).json(status);
  });
}
const statusController = new StatusController();

export { statusController };
