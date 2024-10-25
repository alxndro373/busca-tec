import { auth, signOut } from "@/auth"
import Link from "next/link"



export default async function UserHeader(){

    const session = await auth()

    return (
        <header className="pt-4">
            <nav className="mr-4">
                <ul className="flex justify-end gap-4 items-center">
                    <li>
                        <Link href={'/objects'}>OBJETOS</Link>
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
                                <button type="submit" className="bg-red-500 py-2 px-4 rounded-md">Cerrar Sesion</button>
                            </form>
                        </>
                        : <Link href={'/login'}>INICIAR SESIOIN</Link>
                    }

                    
                </ul>
            </nav>
            

        </header>
    )
}