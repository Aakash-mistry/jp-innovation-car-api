import { Request, Response } from "express";
import { generateToken, hashPassword, matchPassword, Ok, UnAuthorized, verifyToken } from "../utils";
import { IUserProps, SERVER_MESSAGES } from "../interface";
import { User } from "../model";

class UserController {
     public async SignUp(req: Request, res: Response) {
          try {
               const { email, name, password }: IUserProps = req.body;

               const user = await User.findOne({ email });

               if (user) {
                    return UnAuthorized(res, SERVER_MESSAGES.ALREADY_EXIST);
               }

               const newUser = await new User({
                    email,
                    name,
                    password: await hashPassword(password),
               }).save();

               return Ok(res, `${newUser?.name} registered as admin`);
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     }

     public async SignIn(req: Request, res: Response) {
          try {
               const { email, password } = req.body;
               const user = await User.findOne({ email });

               if (!user) {
                    return UnAuthorized(res, SERVER_MESSAGES.ACCOUNT_NOT_FOUND);
               }

               if (!(await matchPassword(user.password, password))) {
                    return UnAuthorized(res, SERVER_MESSAGES.INVALID_PASSWORD);
               }

               const token = generateToken(user.id);

               return Ok(res, { token });
          } catch (err) {
               return UnAuthorized(res, err as unknown as string);
          }
     }

     public async SignedInProfile(req: Request, res: Response) {
          try {
               const decodeToken = verifyToken(req.headers.authorization as string);
               console.log(decodeToken);
               const user = await User.findById({ _id: decodeToken.id });
               return Ok(res, user);
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err as unknown as string);
          }
     }
}

export const UserControllers = new UserController();
