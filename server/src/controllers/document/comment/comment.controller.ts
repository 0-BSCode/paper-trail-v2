import catchAsync from "../../../middleware/catch-async";
import { Request, Response } from "express";
import commentService from "../../../services/comment.service";

class CommentController {
  /**
   * Creates a comment using the Access token's user.id information and the URL's /document/:documentId/comment request parameter.
   */
  public createComment = catchAsync(async (req: Request, res: Response) => {
    const { content } = req.body;
    const { id: userId } = req.user as RequestUser;
    const { documentId } = req.params;

    const newComment = await commentService.createComment(parseInt(userId), parseInt(documentId), content);

    if (newComment === null) {
      // creating a new comment failed
      return res.sendStatus(401);
    }

    return res.json(newComment);
  });

  public getDocumentComments = catchAsync(async (req: Request, res: Response) => {
    const { documentId } = req.params;

    const comments = await commentService.getComments(parseInt(documentId));

    if (comments === null) {
      // no comments exist yet or the document does not exist
      return res.sendStatus(404);
    }

    return res.json(comments);
  });
}
const commentController = new CommentController();

export { commentController };
