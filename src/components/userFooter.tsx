
export default function UserFooter(){
    return (
        <footer className="flex justify-center items-center py-2 mt-auto">
            <section className="max-w-3xl w-full grid grid-cols-3">
                <article>
                    <h3 className="font-semibold mb-2">NUESTRA COMPAÑIA</h3>
                    <ul>
                        <li>Acerca de nosotros</li>
                    </ul>
                </article>
                <article>
                    <h3 className="font-semibold mb-2">POLITICAS</h3>
                    <ul>
                        <li className="mb-2">Aviso de privacidad</li>
                        <li className="mb-2">Términos y condiciones</li>
                        <li className="mb-2">Politicas de cookies</li>
                    </ul>
                </article>
                <article>
                    <h3 className="font-semibold mb-2">DEJANOS AYUDARTE</h3>
                    <ul>
                        <li className="mb-2">Dudas y comentarios</li>
                        <li>Preguntas frecuentes</li>
                    </ul>
                </article>
            </section>
        </footer>
    )
}