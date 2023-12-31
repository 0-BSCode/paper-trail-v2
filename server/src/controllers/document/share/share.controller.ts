import catchAsync from "../../../middleware/catch-async";
import { Request, Response } from "express";
import { User } from "../../../db/models/user.model";
import { Document } from "../../../db/models/document.model";
import { DocumentUser } from "../../../db/models/document-user.model";
import { validationResult } from "express-validator";

// TODO: Possibly add share service to extract queries
class ShareController {
  public create = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) return res.sendStatus(400);
    // this document can only be shared by its original creator
    if (!req.user?.id || document.userId !== parseInt(req.user?.id)) {
      return res.sendStatus(400);
    }

    const { email, permission } = req.body;
    const sharedUser = await User.findOne({
      where: {
        email
      }
    });
    if (!sharedUser) return res.sendStatus(400);

    const documentUser = await DocumentUser.create({
      documentId: id,
      userId: sharedUser.id,
      permission: permission
    });

    return res.status(201).json(documentUser);
  });
  public update = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) return res.sendStatus(400);
    // this document can only be shared by its original creator
    if (!req.user?.id || document.userId !== parseInt(req.user?.id)) {
      return res.sendStatus(400);
    }

    const { userId, permission } = req.body;

    const documentUser = await DocumentUser.findOne({
      where: {
        documentId: id,
        userId
      }
    });

    if (!documentUser) return res.sendStatus(404);
    await documentUser.update({ permission });

    return res.status(200).json(documentUser);
  });
  public delete = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { documentId, userId } = req.params;

    const document = await Document.findOne({
      where: {
        id: documentId,
        userId: req.user?.id
      }
    });
    if (!document) return res.sendStatus(400);

    const query = {
      where: {
        documentId,
        userId
      }
    };
    const documentUser = await DocumentUser.findOne(query);
    if (!documentUser) return res.sendStatus(400);

    await DocumentUser.destroy(query);

    return res.sendStatus(200);
  });
}
const shareController = new ShareController();

export { shareController };
