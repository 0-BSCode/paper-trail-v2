import { Router } from "express";
import { documentController } from "../controllers/document/document.controller";
import { shareController } from "../controllers/document/share/share.controller";
import { commentController } from "../controllers/document/comment/comment.controller";
import { authenticate } from "../middleware/auth";
import { documentValidator } from "../validators/document.validator";
import { shareValidator } from "../validators/share.validator";
import { statusController } from "../controllers/document/status/status.controller";
import { assigneeController } from "../controllers/document/assignee/assignee.controller";

const router = Router();

router.get("/all", authenticate, documentController.getAllDocuments);
router.get("/status", authenticate, statusController.getAll);
router.get("/:id", authenticate, documentController.getOne);
router.get("/", authenticate, documentController.getAllUserDocuments);
router.put("/:id", authenticate, documentValidator.update, documentController.update);
router.post("/", authenticate, documentController.create);
router.delete("/:id", authenticate, documentController.delete);
router.post("/:id/share", authenticate, shareValidator.create, shareController.create);
router.put("/:id/share", authenticate, shareController.update);
router.delete("/:documentId/share/:userId", authenticate, shareController.delete);
router.get("/assignee/:id", authenticate, assigneeController.getAssigneeDocuments);
router.get("/:documentId/assignee", authenticate, assigneeController.getAssignee);
router.put("/:documentId/assignee", authenticate, assigneeController.setAssignee);
router.get("/:documentId/comment", authenticate, commentController.getDocumentComments);
router.post("/:documentId/comment", authenticate, commentController.createComment);
router.get("/:id/status", authenticate, statusController.getStatus);
router.put("/:id/status", authenticate, statusController.updateStatus);

export default router;
