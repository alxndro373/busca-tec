import Link from "next/link";

export default function UserFooter(){
    return (
        <footer className="flex justify-center items-center py-2 mt-auto">
            <section className="max-w-3xl w-full grid grid-cols-3">
                <article>
                    <h3 className="font-semibold mb-2">NUESTRA COMPAÑIA</h3>
                    <ul>
                        <li>
                            <Link href={"/terms/us"} className="hover:text-blue-400">Acerca de nosotros</Link>
                        </li>
                    </ul>
                </article>
                <article>
                    <h3 className="font-semibold mb-2">POLITICAS</h3>
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