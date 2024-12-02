import Link from "next/link"

export default function UserFooter(){
    return (
        <footer className="flex justify-center items-center py-4 sm:py-6 mt-auto bg-gray-100">
            <section className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8">
                <article>
                    <h3 className="font-semibold mb-2 text-lg sm:text-xl">NUESTRA COMPAÑIA</h3>
                    <ul>
                        <li>
                            <Link href={"/terms/us"} className="hover:text-blue-400">Acerca de nosotros</Link>
                        </li>
                    </ul>
                </article>
                <article>
                    <h3 className="font-semibold mb-2 text-lg sm:text-xl">POLITICAS</h3>
                    <ul>
                        <li className="mb-2"><Link href={"/terms/privacy"} className="hover:text-blue-400">Aviso de privacidad</Link></li>
                        <li className="mb-2"><Link href={"/terms/termsConditions"} className="hover:text-blue-400">Términos y condiciones</Link></li>
                        <li className="mb-2"><Link href={"/terms/cookiesPol"} className="hover:text-blue-400">Politicas de cookies</Link></li>
                    </ul>
                </article>
            </section>
        </footer>
    )
}
