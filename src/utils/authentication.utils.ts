import argon from "argon2";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const hashPassword = async (password: string) => {
     return await argon.hash(password);
};

export const matchPassword = async (hashedPassword: string, password: string) => {
     return await argon.verify(hashedPassword, password);
};

export const generateToken = (userId: string): string => {
     return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): any => {
     return jwt.verify(token, JWT_SECRET);
};
