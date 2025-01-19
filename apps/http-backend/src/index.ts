import express from "express";
import middleware from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { SignupSchema, SiginSchema, CreateRoomSchema } from "@repo/common/type";
import prisma from "@repo/db/client";
import { zod } from "@repo/common/type";
import bcrpt from "bcrypt";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    SignupSchema.parse({ email, name, password });
    const hashedPassword = await bcrpt.hash(password, 10);

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
      res.cookie("token", token);
      res.status(200).json({
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          token: token,
        },
      });
      return;
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        token: token,
      },
    });
    return;
  } catch (error) {
    console.log(error);
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
      res.cookie("token", token);
      res.status(200).json({
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          token: token,
        },
      });
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
    res.status(400).json("Something went wrong while creating the room");
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

app.get("/chats/:roomId", middleware, async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    if (!roomId) {
      res.status(400).json("provide room Id");
      return;
    }
    const response = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json(response);
    return;
  } catch (error) {
    res.status(500).json("Something went wrong");
    return;
  }
});
app.get("/room/:slug", middleware, async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      res.status(400).json("provide valid slug");
      return;
    }
    const response = await prisma.room.findFirst({
      where: {
        slug,
      },
    });
    if (response) {
      res.status(200).json(response);
      return;
    }
    res.status(400).json("Cannot find room with this slug");
    return;
  } catch (error) {
    res.status(500).json("Something went wrong");
    return;
  }
});

app.listen(3001, () => {
  console.log("Http server running on : 3001");
});
