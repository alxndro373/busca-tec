'use client'

import { registerSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {z} from "zod"

export default function Register(){

    const {handleSubmit, register, formState:{errors}} = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            user: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values)
    }


    const router = useRouter()
    return (
        <div className="bg-blue-950 h-screen flex flex-col items-center  gap-8">
            <h1 className="font-bold text-white text-4xl mt-20">Registrate</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <input type="text" placeholder="nombre de usuario" className="w-96 py-2" {...register("user")} />
                    {errors.user && <span className="text-red-500">{errors.user.message}</span>}
                    <input type="text" placeholder="correo electronico" className="w-96 py-2" {...register("email")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <input type="text" placeholder="número de telefono" className="w-96 py-2" {...register("phone")} />
                    {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    <input type="password" placeholder="contraseña" className="w-96 py-2" {...register("password")} />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    <input type="password" placeholder="confirmar contraseña" className="w-96 py-2" {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                </div>
                <span className="mb-8 text-white inline-block">Al registrarte aceptas los <strong>Terminos y </strong> <br /> <strong>condiciones y aviso de privacidad</strong> </span>
                <div className="flex flex-col gap-8 items-center">
                    <button className="bg-[#D0D9EC] p-2 w-64">Registrase</button>
                    <button type="button" onClick={() => router.push('/login')} className="bg-[#D0D9EC] p-2 w-72">¿Ya tienes cuenta? Iniciar sesion.</button>
                </div>
            </form>
        </div>
    )
}

