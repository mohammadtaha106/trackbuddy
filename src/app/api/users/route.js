import { connectDB } from "@/app/db/connectDB";
import { UserModal } from "@/app/db/models/User";

export async function GET(request) {
    await connectDB()
    const users = await UserModal.find()
    return Response.json(
        {
            msg:'Users Fetched Successfully',
            users
        },
        { status: 200 })
}

 
export async function POST(request) {
    await connectDB()
    let obj = await request.json()
    let newUser = await UserModal.find(obj)
    await newUser.save();
    return Response.json({
        msg:'Users Added Successfully',
        user: newUser
    },{ status: 201 }
)
}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}