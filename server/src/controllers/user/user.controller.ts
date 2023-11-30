import { validationResult } from "express-validator";
import { userService } from "../../services/user.service";
import catchAsync from "../../middleware/catch-async";
import { Request, Response } from "express";
import { resetPassword } from "../../responses";
import jwt, { VerifyErrors } from "jsonwebtoken";
import env from "../../config/env.config";
import { UserRole } from "../../db/models/user-role.model";
import RoleEnum from "../../types/enums/role-enum";

class UserController {
  public register = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { email, password1 } = req.body;
    await userService.createUser(email, password1);

    return res.sendStatus(200);
  });

  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const verificationToken = req.params.token;

    jwt.verify(verificationToken, env.VERIFY_EMAIL_SECRET, async (err: VerifyErrors | null, decoded: unknown) => {
      if (err) return res.sendStatus(403);
      try {
        const { email } = decoded as { email: string };

        userService
          .findUserByVerificationToken(email, verificationToken)
          .then((user) => {
            if (!user || user.isVerified) {
              return res.sendStatus(400);
            }

            userService
              .updateIsVerified(user, true)
              .then(() => {
                return res.sendStatus(200);
              })
              .catch(() => {
                return res.sendStatus(500);
              });
          })
          .catch(() => {
            return res.sendStatus(500);
          });
      } catch (error) {
        console.log(error);
        return res.sendStatus(403);
      }
    });
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
    const { id: userId } = req.user as RequestUser;
    const { id } = req.params;
    const { fullName, contactNumber, courseAndYear, studentIdNumber } = req.body;

    // Check if the user that requested the update is requesting their own details to update
    if (Number(id) !== Number(userId)) {
      return res.status(403).end();
    }

    const updatedUser = await userService.updateUserDetails(Number(userId), {
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

  public resetPassword = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { email } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(200).json(resetPassword);

    await userService.resetPassword(user);

    return res.status(200).json(resetPassword);
  });

  public confirmResetPassword = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const resetPasswordToken = req.params.token;
    const { password1 } = req.body;

    jwt.verify(resetPasswordToken, env.PASSWORD_RESET_SECRET, async (err: VerifyErrors | null, decoded: unknown) => {
      if (err) return res.sendStatus(403);
      try {
        const { email } = decoded as { email: string };

        userService
          .findUserByPasswordResetToken(email, resetPasswordToken)
          .then((user) => {
            if (!user) {
              return res.sendStatus(400);
            }

            userService
              .updatePassword(user, password1)
              .then(() => {
                return res.sendStatus(200);
              })
              .catch(() => {
                return res.sendStatus(500);
              });
          })
          .catch(() => {
            return res.sendStatus(500);
          });
      } catch (error) {
        console.log(error);
        return res.sendStatus(403);
      }
    });
  });
}
const userController = new UserController();

export { userController };
