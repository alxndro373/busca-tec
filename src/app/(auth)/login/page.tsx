"use client"

import { loginSchema } from "@/lib/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginAction } from "@/actions/authAction"
import { useState } from "react"

export default function Login() {
    const [err, setErr] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setErr(null)
        setLoading(true)
        const response = await loginAction(values)

        if (response.success) {
            if (response.rol === "admin") {
                router.push("/adminPages")
            } else {
                router.push("/")
            }
        } else {
            setErr(response.error)
        }
        setLoading(false)
    }

    return (
        <div className="bg-blue-950 h-screen flex flex-col items-center gap-8">
            <h1 className="font-bold text-white text-4xl mt-20">Iniciar Sesión</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        className="w-96 py-2"
                        {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                        <span className="text-red-500">{form.formState.errors.email.message}</span>
                    )}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-96 py-2"
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <span className="text-red-500">{form.formState.errors.password.message}</span>
                    )}
                </div>
                <div className="flex flex-col gap-8 items-center">
                    <button
                        className="bg-[#D0D9EC] p-2 w-64"
                        type="submit"
                        disabled={loading} // Deshabilitamos el botón mientras cargamos
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/register")}
                        className="bg-[#D0D9EC] p-2 w-72"
                    >
                        ¿Nuevo? Crear una cuenta.
                    </button>
                </div>
            </form>
            {err && <span className="text-red-500">{err}</span>}
        </div>
    )
}
