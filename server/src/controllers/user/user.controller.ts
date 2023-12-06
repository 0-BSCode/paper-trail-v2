import { validationResult } from "express-validator";
import { userService } from "../../services/user.service";
import catchAsync from "../../middleware/catch-async";
import { Request, Response } from "express";
import { UserRole } from "../../db/models/user-role.model";
import RoleEnum from "../../types/enums/role-enum";

class UserController {
  public register = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { email, password1, fullName, studentIdNumber } = req.body;
    await userService.createUser(email, password1, fullName, studentIdNumber);

    return res.sendStatus(200);
  });

  public getUser = catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    const user = await userService.findUserById(userId);

    if (user === null) return res.sendStatus(400);

    return res.status(200).json(user);
  });

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();

    if (users === null) return res.sendStatus(400);

    return res.status(200).json(users);
  });

  // TODO: Add guards
  public getUsersByRole = catchAsync(async (req: Request, res: Response) => {
    const { names } = req.params;
    const users = await userService.findUsersByRole(names.split(",") as unknown as UserRole[]);
    return res.status(200).json(users);
  });

  public updateUserPersonalInformation = catchAsync(async (req: Request, res: Response) => {
    const { id: userId, roles } = req.user as RequestUser;
    const { id } = req.params;
    const { fullName, contactNumber, courseAndYear, studentIdNumber } = req.body;

    // Check if the user that requested the update is requesting their own details to update
    // or if they are not a CISCO_ADMIN
    const isCiscoAdmin = roles.find((r) => r !== RoleEnum.CISCO_ADMIN);
    if (Number(id) !== Number(userId) && !isCiscoAdmin) {
      return res.status(403).end();
    }

    const updatedUser = await userService.updateUserDetails(Number(id), {
      fullName,
      contactNumber,
      courseAndYear,
      studentIdNumber
    });

    return res.status(200).json(updatedUser);
  });

  public updateUserRoles = catchAsync(async (req: Request, res: Response) => {
    const { roles: requestingUserRoles } = req.user as RequestUser;
    const { id } = req.params;

    // Check if the user that requested the update is authorized (CISCO_ADMIN)
    const isCiscoAdmin = requestingUserRoles.find((r) => r === RoleEnum.CISCO_ADMIN);
    if (!isCiscoAdmin) {
      return res.status(403).end();
    }

    const { roles } = req.body;

    if (!roles) {
      return res.status(400).json({ error: "You must specify roles to update." });
    }

    const updatedUser = await userService.updateUserRoles(Number(id), roles);

    return res.status(200).json(updatedUser);
  });
}
const userController = new UserController();

export { userController };
