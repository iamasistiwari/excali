"use server"
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function RoomValidation(slug: string): Promise<string | null> {
    try {
        console.log("CALLED")
        const session = await getServerSession(authOptions)
        if(!session){
            return null
        }
        const response = await axios.get(`http://localhost:3001/room/${slug}`, {
            headers: {
                Authorization: session.user.token
            }
        });
        if(response){
            const roomId = response.data.id
            return roomId
        }
        return null
    } catch (error) {
        return null
    }
}