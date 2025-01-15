import express from "express";
import middleware from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { JwtPayload } from "../types/jwt";
import jwt from "jsonwebtoken";
import { SignupSchema, SiginSchema, CreateRoomSchema } from "@repo/common/type";
import prisma from "@repo/db/client";
import { zod } from "@repo/common/type";
import bcrpt from "bcrypt";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { email, name, password, avatarUrl } = req.body;
    SignupSchema.parse({ email, name, password, avatarUrl });
    const hashedPassword = await bcrpt.hash(password, 10);
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      res.status(403).json("User already exits. Signin to continue");
      return;
    }
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatarUrl,
      },
    });
    res.status(200).json("OK");
    return;
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      res.status(422).json({
        error: "Invalid Payload",
        details: errors,
      });
      return;
    }
    res.status(403).json("Something went wrong");
    return;
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    SiginSchema.parse({ email, password });

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      const passwordValidation = await bcrpt.compare(
        password,
        existingUser.password,
      );
      if (!passwordValidation) {
        res.status(403).json("Password is incorrect");
        return;
      }
      const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
      res.status(200).json(token);
      return;
    } else {
      res.status(403).json("User not found");
      return;
    }
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      res.status(422).json({
        error: "Invalid Payload",
        details: errors,
      });
      return;
    }
    res.status(403).json("Something went wrong");
    return;
  }
});
app.post("/room", middleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.body;
    CreateRoomSchema.parse({ slug });
    const response = await prisma.room.create({
      data: {
        slug,
        adminId: userId,
      },
    });
    if (response) {
      res.status(200).json({ roomId: response.id, roomSlug: response.slug });
      return;
    }
    res.status(400).json("WRONG");
    return;
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      res.status(422).json({
        error: "Invalid Payload",
        details: errors,
      });
      return;
    }
    res.status(403).json("Something went wrong");
    return;
  }
});

app.listen(3001, () => {
  console.log("Http server running on : 3001");
});
