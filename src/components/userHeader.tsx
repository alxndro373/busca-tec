import { auth, signOut } from "@/auth"
import Link from "next/link"



export default async function UserHeader(){

    const session = await auth()

    return (
        <header className="pt-4">
            <nav className="mr-4">
                <ul className="flex justify-end gap-4 items-center">
                    <li>
                        <Link href={"/"}>Inicio</Link>
                    </li>
                    <li>
                        <Link href={'/objects'}>Objetos</Link>
                    </li>
                
                    {
                        session ? <>
                            <li>
                                <span>Bienvenido: {session.user?.name}</span>
                            </li>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button className="bg-blue-950 text-white py-2 px-4 rounded-md mb-1 mr-1">
                                    <Link href={"/ad"}>Añadir anuncio</Link>
                                </button>
                                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md mb-1">Cerrar Sesion</button>
                            </form>
                        </>
                        : <Link href={'/login'}>Iniciar Sesión</Link>
                    }

                    
                </ul>
            </nav>
            

        </header>
    )
}