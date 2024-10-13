'use client'

import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    return (
        <div className="bg-blue-950 h-screen flex flex-col items-center  gap-8">
            <h1 className="font-bold text-white text-4xl mt-20">Iniciar Sesion</h1>
            <form className="">
                <div className="flex flex-col gap-6">
                <input type="text" placeholder="correo electronico" className="w-96 py-2" />
                <input type="password" placeholder="contraseña" className="w-96 py-2"  />
                </div>
                <span className="mb-8 text-white inline-block">¿Olvidaste tu contraseña?</span>
                <div className="flex flex-col gap-8 items-center">
                    <button className="bg-[#D0D9EC] p-2 w-64">Iniciar Sesion</button>
                    <button type="button" onClick={() => router.push('/register')} className="bg-[#D0D9EC] p-2 w-72">¿Nuevo? crear una cuenta.</button>
                </div>
            </form>
        </div>
    )
}