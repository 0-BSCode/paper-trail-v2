import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";
import { RefreshToken } from "../db/models/refresh-token.model";
import env from "../config/env.config";
import { UserRole } from "../db/models/user-role.model";
import { Role } from "../db/models/role.model";
import { Op } from "sequelize";
import RoleEnum from "../types/enums/role-enum";

// TODO: Clean up unused service methods
class UserService {
  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } });

    return user;
  };

  public findUserById = async (id: number): Promise<User | null> => {
    const user = await User.findByPk(id);

    return user;
  };

  public findUserByVerificationToken = async (email: string, verificationToken: string): Promise<User | null> => {
    const user = await User.findOne({
      where: {
        email,
        verificationToken
      }
    });

    return user;
  };

  public findUserByPasswordResetToken = async (email: string, passwordResetToken: string): Promise<User | null> => {
    const user = await User.findOne({
      where: {
        email,
        passwordResetToken
      }
    });

    return user;
  };

  public getAllUsers = async (): Promise<User[]> => {
    return await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      ],
      attributes: {
        exclude: ["password", "passwordResetToken", "createdAt", "updatedAt", "isVerified", "verificationToken"]
      }
    });
  };

  public findUsersByRole = async (roles: UserRole[]): Promise<User[]> => {
    return await User.findAll({
      include: [
        {
          model: Role,
          attributes: [],
          where: {
            name: {
              [Op.in]: roles
            }
          },
          through: {
            attributes: []
          }
        }
      ],
      attributes: {
        exclude: ["password", "passwordResetToken", "createdAt", "updatedAt", "isVerified", "verificationToken"]
      }
    });
  };

  public createUser = async (email: string, password: string, fullName: string, studentIdNumber: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const verificationToken = jwt.sign({ email }, env.VERIFY_EMAIL_SECRET);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      fullName,
      studentIdNumber,
      verificationToken: verificationToken
    });

    await UserRole.create({
      userId: newUser.id,
      roleId: 1 // ID of STUDENT role
    });
  };

  public checkPassword = async (user: User, password: string): Promise<boolean> => {
    return await compare(password, user.password);
  };

  public generateAuthResponse = async (user: RequestUser | User): Promise<TokenPair> => {
    const requestUser = await this.getRequestUser(user);

    const accessToken = jwt.sign(requestUser, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRATION
    });
    const refreshToken = jwt.sign(requestUser, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRATION
    });

    await RefreshToken.destroy({
      where: { userId: requestUser.id }
    });
    await RefreshToken.create({ token: refreshToken, userId: requestUser.id });

    return { accessToken, refreshToken };
  };

  public getIsTokenActive = async (token: string): Promise<boolean> => {
    const refreshToken = await RefreshToken.findOne({
      where: {
        token
      }
    });

    return refreshToken !== null;
  };

  public logoutUser = async (userId: number) => {
    await RefreshToken.destroy({
      where: {
        userId
      }
    });
  };

  public resetPassword = async (user: User) => {
    const passwordResetToken = jwt.sign({ id: user.id, email: user.email }, env.PASSWORD_RESET_SECRET, {
      expiresIn: env.PASSWORD_RESET_EXPIRATION
    });

    await user.update({
      passwordResetToken
    });
  };

  public updatePassword = async (user: User, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    await user.update({
      password: hashedPassword
    });
  };

  public updateIsVerified = async (user: User, isVerified: boolean) => {
    await user.update({
      isVerified
    });
  };

  /**
   * Updates the user's details, outside their email & password.
   *
   * @param userId The userId of the user that to update
   * @param newDetails The new full_name, contact_number, course_and_year, student_id_number used to update.
   * @returns the newly-updated user
   */
  public updateUserDetails = async (
    userId: number,
    {
      fullName,
      contactNumber,
      courseAndYear,
      studentIdNumber
    }: Pick<User, "fullName" | "contactNumber" | "courseAndYear" | "studentIdNumber">
  ): Promise<null | User> => {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error(`User with id: ${userId} not found.`);
    }

    const updatedFullName = fullName || "";
    const updatedContactNumber = contactNumber || "";
    const updatedCourseAndYear = courseAndYear || "";
    const updatedStudentIdNumber = studentIdNumber || "";

    await user.update({
      fullName: updatedFullName,
      contactNumber: updatedContactNumber,
      courseAndYear: updatedCourseAndYear,
      studentIdNumber: updatedStudentIdNumber
    });

    const updatedUser = await User.findByPk(userId);
    if (!updatedUser) {
      throw new Error("Failed to fetch updated user.");
    }

    return updatedUser;
  };

  /**
   * Updates the user's roles given the new array of roles the user should have.
   * This syncs the database UserRole rows to match with the `newRoles` argument.
   *
   * @param userId The userId of the user that to update
   * @param newDetails The new full_name, contact_number, course_and_year, student_id_number used to update.
   * @returns the newly-updated user
   */
  public updateUserRoles = async (userId: number, newRoles: RoleEnum[]): Promise<User | null> => {
    const allowedRoles: RoleEnum[] = Object.values(RoleEnum);
    const user = await User.findByPk(userId, { include: [{ model: Role, through: { attributes: [] } }] });

    if (!user) {
      throw new Error(`User with id: ${userId} not found.`);
    }

    const existingRoles = user.roles.map((role) => role.name as RoleEnum);
    const rolesToAdd = newRoles.filter((role) => allowedRoles.includes(role) && !existingRoles.includes(role));
    const rolesToRemove = existingRoles.filter((role) => !newRoles.includes(role) && role !== RoleEnum.CISCO_ADMIN);

    if (rolesToAdd.length || rolesToRemove.length) {
      const rolesToAddInstances = await Role.findAll({ where: { name: rolesToAdd } });
      const rolesToRemoveInstances = await Role.findAll({ where: { name: rolesToRemove } });

      await UserRole.destroy({
        where: {
          userId,
          roleId: rolesToRemoveInstances.map((role) => role.id)
        }
      });

      if (rolesToAddInstances.length) {
        const userRoleData = rolesToAddInstances.map((role) => ({ userId, roleId: role.id }));
        await UserRole.bulkCreate(userRoleData);
      }
    }

    const updatedUserWithRoles = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          through: {
            attributes: []
          }
        }
      ]
    });

    if (!updatedUserWithRoles) {
      throw new Error("Failed to fetch updated user with roles.");
    }

    const updatedUserWithFilteredData = updatedUserWithRoles.toJSON();

    const excludedProperties = ["password", "verificationToken", "passwordResetToken", "createdAt", "updatedAt"];
    excludedProperties.forEach((prop) => {
      delete updatedUserWithFilteredData[prop as keyof User];
    });

    return updatedUserWithFilteredData;
  };

  private getRequestUser = async (user: User | RequestUser): Promise<RequestUser> => {
    if (user instanceof User) {
      const userWithRoles = await User.scope("withRoles").findByPk(user.id);
      const roles = userWithRoles?.userRoles.map((userRole) => userRole.role.name);
      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roles: roles
      } as RequestUser;
    } else return user;
  };
}
const userService = new UserService();

export { userService };
