import { Request , Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";
import { JWT_SECRET } from "@repo/backend-common/config";

export default function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    if(decoded && decoded.userId){
        req.userId = decoded.userId
        next()
    }else{
        res.status(403).json("Unauthorized Request")
        return
    }
}