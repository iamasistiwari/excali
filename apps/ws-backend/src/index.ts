import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { JwtPayload } from "../types/jwt";
import prisma from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

const users: Map<WebSocket, {rooms: Set<string>, userId: string}> = new Map()

interface ParsedData {
  type: "join_room" | "leave_room" | "chat",
  roomId: string,
  message?: string
}


function userValidation(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;

  } catch (error) {
    return null
  }
}

wss.on("connection", (socket, request) => {
  try {
    const url = request.url;
    if (!url) {
      return socket.close();
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const userId = userValidation(token);

    if (!userId) {
      return socket.close();
    }

    users.set(socket, {rooms: new Set(), userId})
    

    socket.on("message", async (event) => {
      try {
        console.log("WHERE", event.toString())
        const parsedData: ParsedData = JSON.parse(event as unknown as string)
         console.log("HERE IS CO");

        const user = users.get(socket)
        console.log("USER", user)
        if(!user) return;

        if(parsedData.type === "join_room"){
          user.rooms.add(parsedData.roomId);
          // await prisma.room.create({
          //   data: {
          //     slug: parsedData.roomId,
          //     adminId: userId
          //   }
          // })
          return
        }
        if (parsedData.type === "chat"){
          const { roomId, message } = parsedData
          if(!roomId || !message){
            return
          }

          await prisma.chat.create({
            data: {
              roomId: Number(roomId),
              message,
              userId
            }
          })


          users.forEach((user, client) => {
            if(user.rooms.has(roomId)){
              client.send(JSON.stringify({type: "chat", roomId, message}))
            }
          })
          return
        }
        if(parsedData.type === "leave_room"){
          user.rooms.delete(parsedData.roomId)
          return
        }
        else{
          socket.send(
            JSON.stringify({ type: "error", message: "Invalid data format" }),
          );
          return
        }
      } catch (error) {
        socket.send(JSON.stringify({type: "error", message: "Something went wrong"}))
        return
      }
      
    });
    socket.on("close", () => {
      users.delete(socket)
    })

  } catch (error) {
    socket.send(
      JSON.stringify({ type: "error", message: "Something went wrong here" }),
    );
    return
  }
});




