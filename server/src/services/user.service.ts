import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";
import { RefreshToken } from "../db/models/refresh-token.model";
import env from "../config/env.config";
import { UserRole } from "../db/models/user-role.model";
import { Role } from "../db/models/role.model";
import { Op } from "sequelize";

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

  public createUser = async (email: string, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const verificationToken = jwt.sign({ email }, env.VERIFY_EMAIL_SECRET);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
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

  private getRequestUser = async (user: User | RequestUser): Promise<RequestUser> => {
    if (user instanceof User) {
      const userWithRoles = await User.scope("withRoles").findByPk(user.id);
      const roles = userWithRoles?.userRoles.map((userRole) => userRole.role.name);
      return {
        id: user.id,
        email: user.email,
        roles: roles
      } as RequestUser;
    } else return user;
  };
}
const userService = new UserService();

export { userService };
