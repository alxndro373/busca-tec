export default function Privacy() {
    return (
        <>
            <section className="mx-auto">
                <article className="bg-blue-950 h-60 flex justify-center items-center rounded-lg shadow-lg">
                    <h1 className="text-white text-5xl font-extrabold text-center">
                        Aviso de Privacidad
                    </h1>
                </article>

                <main className="bg-blue-100 p-12 rounded-lg shadow-lg flex justify-center items-center">
                    <article className="text-center md:text-left w-full space-y-8">
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            En <span className="font-semibold">BuscaTec</span>, nos comprometemos a proteger tu privacidad y a garantizar la confidencialidad de tus datos personales. Este aviso de privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos tu información personal cuando utilizas nuestra plataforma para publicar y buscar objetos perdidos y encontrados.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">1. Responsable de la Información</span><br />
                            <span className="font-semibold">BuscaTec</span> es responsable de la recopilación y protección de los datos personales proporcionados por los usuarios.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">2. Datos Personales que Recopilamos</span><br />
                            Para poder utilizar nuestra plataforma, recopilamos y almacenamos los siguientes datos personales:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-800">
                            <li>Nombre de usuario: para identificarte dentro de la plataforma.</li>
                            <li>Correo electrónico: para administrar tu cuenta y, en caso necesario, enviarte notificaciones relacionadas con la seguridad de tu cuenta.</li>
                            <li>Número de teléfono: para permitirte que otros usuarios puedan ponerse en contacto contigo, si decides proporcionarlo en tus publicaciones.</li>
                            <li>Contraseña: utilizada exclusivamente para acceder a tu cuenta y garantizar su seguridad.</li>
                        </ul>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">3. Finalidades del Tratamiento de Datos</span><br />
                            Los datos personales recopilados se utilizarán para los siguientes fines:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-800">
                            <li>Administrar y gestionar tu cuenta en <span className="font-semibold">BuscaTec</span>.</li>
                            <li>Publicar y mostrar la información sobre objetos perdidos y encontrados, permitiendo que los usuarios interesados se pongan en contacto contigo externamente.</li>
                            <li>Garantizar la seguridad y autenticidad de las cuentas de usuario.</li>
                        </ul>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">4. Protección de Datos Personales</span><br />
                            En <span className="font-semibold">BuscaTec</span>, adoptamos las medidas de seguridad necesarias para proteger tu información contra acceso no autorizado, pérdida o alteración. La contraseña de tu cuenta está cifrada y solo tú tienes acceso a ella.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">5. Comunicación Externa</span><br />
                            <span className="font-semibold">BuscaTec</span> facilita la publicación de anuncios, pero la comunicación entre usuarios para reclamar objetos es externa a la plataforma. <span className="font-semibold">BuscaTec</span> no se hace responsable del uso que terceros puedan dar a la información de contacto compartida por los usuarios.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            <span className="font-bold">6. Cambios en el Aviso de Privacidad</span><br />
                            <span className="font-semibold">BuscaTec</span> se reserva el derecho de actualizar este aviso de privacidad para reflejar cambios en nuestras prácticas o en la legislación aplicable. Cualquier cambio será publicado en nuestro sitio web.
                        </p>
                    </article>
                </main>
            </section>
        </>
    )
}
