import Link from "next/link"



export default function UserHeader(){
    return (
        <header className="pt-4">
            <nav className="mr-4">
                <ul className="flex justify-end gap-4">
                    <li>
                        <Link href={'/objects'}>OBJETOS</Link>
                    </li>
                    <li>
                        <Link href={'/login'}>INICIAR SESIOIN</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}