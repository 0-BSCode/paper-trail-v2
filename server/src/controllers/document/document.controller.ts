import catchAsync from "../../middleware/catch-async";
import { Request, Response } from "express";
import { Document } from "../../db/models/document.model";
import { validationResult } from "express-validator";
import { DocumentUser } from "../../db/models/document-user.model";
import { User } from "../../db/models/user.model";
import documentService from "../../services/document.service";
import notificationService from "../../services/notification.service";

class DocumentController {
  public getOne = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;
    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));

    if (document === null) return res.sendStatus(404);

    return res.status(200).json(document);
  });

  public getAllUserDocuments = catchAsync(async (req: Request, res: Response) => {
    const documents = await Document.findAll({
      where: {
        userId: req.user?.id
      }
    });
    const documentUsers = await DocumentUser.findAll({
      where: {
        userId: req.user?.id
      },
      include: {
        model: Document
      }
    });
    const sharedDocuments = documentUsers.map((documentUser) => documentUser.document);
    documents.push(...sharedDocuments);

    return res.status(200).json(documents);
  });

  public getAllDocuments = catchAsync(async (req: Request, res: Response) => {
    const documents = await Document.findAll({
      include: [
        { model: User, as: "owner", attributes: ["email"] },
        { model: User, as: "assignee", attributes: ["email"] },
        { model: DocumentUser, include: [{ model: User, attributes: ["email"] }] }
      ]
    });

    if (!documents) return res.status(400).json({ message: "No documents were found" });

    return res.status(200).json(documents);
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    const document = await Document.create({
      userId: req.user?.id
    });

    await notificationService.notifyCiscoNewlyCreatedTicket(document.id);

    return res.status(201).json(document);
  });

  public update = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;
    const { title, content, isPublic, status } = req.body;

    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));

    if (document === null) return res.sendStatus(404);

    if (title !== undefined && title !== null) document.title = title;
    if (content !== undefined && content !== null) document.content = content;
    if (isPublic !== undefined && isPublic !== null) document.isPublic = isPublic;
    if (status !== undefined && status !== null) document.status = status;
    await document.save();

    return res.sendStatus(200);
  });

  public delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await Document.destroy({
      where: {
        id: id,
        userId: req.user?.id
      }
    });

    return res.sendStatus(200);
  });
}
const documentController = new DocumentController();

export { documentController };
