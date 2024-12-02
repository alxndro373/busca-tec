import { NextRequest, NextResponse } from "next/server"
import { deleteObject } from "@/actions/objectAction"

export async function DELETE(req: NextRequest, { params }: { params: { id_object: string } }) {
    const { id_object } = params

    if (!id_object) {
        return NextResponse.json({ message: "ID del objeto es requerido." }, { status: 400 })
    }

    try {
        await deleteObject(id_object)
        return NextResponse.json({ message: "Objeto eliminado exitosamente." }, { status: 200 })
    } catch (error) {
        console.error("Error al eliminar el objeto:", error)
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 })
    }
}