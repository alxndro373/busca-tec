import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"


export async function POST(request: Request){

    const data = await request.formData()
    const file = data.get("file") as File | null
    if(!file) return NextResponse.json({message: "no se proporciono ningun archivo"}, {status: 400})

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const res = await new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({},(err,result) => {
            if(err) reject(err)

            resolve(result)
        }).end(buffer)
    })

    const url = (res as any).secure_url


    return NextResponse.json({image_url: url})
}