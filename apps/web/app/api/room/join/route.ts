import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { ParsedData } from "@repo/common/type"
import { zod } from "@repo/common/type";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
    try {
        // const session = await getServerSession(authOptions)
        // if(!session){
        //     return new Response("Unauthorized Request", {status: 401});
        // }
        const body = await req.json()
        const {type, roomId, message } = ParsedData.parse(body)

        //verify if room exists or not
        const roomValid = await prisma.room.findFirst({
            where: {
                slug: roomId
            }
        })
        if(!roomValid){
            return new Response("This room doesn't exits", {status: 404})
        }

        return new Response(JSON.stringify(roomValid) ,{ status: 200 });

    } catch (error) {
        if(error instanceof zod.ZodError){
            return new Response("Invalid payload", {status: 400})
        }
    }


}
