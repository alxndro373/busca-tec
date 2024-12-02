import Image from "next/image"
import Link from "next/link"
import image1 from "@/assets/image 1.jpg"
import image3 from '@/assets/image 3.jpg'

export default function Home() {
  return (
    <section>
      <article className="bg-blue-950 h-52 flex justify-center items-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
          ¿Perdiste algo? <br /> ¡Aquí lo encontraras!
        </h1>
      </article>

      <main className="flex flex-col md:flex-row justify-evenly items-center bg-[#EBDEDE] p-4 md:p-8">
        <article className="text-center w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="font-bold text-2xl md:text-4xl mb-3 md:mb-5">
            ¿Has perdido algo <br /> importante?
          </h2>
          <p className="mb-3 md:mb-5">
            Llegaste al lugar indicado, nuestra plataforma está dedicada a ayudarte a reportar tus objetos perdidos de manera fácil.
          </p>
          <p className="mb-3 md:mb-5">
            Publica información detallada sobre el objeto y conecta con otros usuarios que puedan tener información relevante.
          </p>
          <h3 className="mb-3 md:mb-5 font-bold text-lg">
            ¡Recupera tus objetos valiosos hoy mismo!
          </h3>
          <button className="bg-blue-950 rounded-md w-[200px] md:w-[266px] py-2 text-white hover:text-blue-100">
            <Link href={'/objects'}>Ir a objetos</Link>
          </button>
        </article>
        <article className="w-full md:w-auto">
          <Image
            src={image1}
            alt="Lost objects"
            width={400}
            height={200}
            className="w-full max-w-[400px] md:w-auto"
          />
        </article>
      </main>

      <article className="bg-[#F5E8CA] p-4 md:h-52 flex flex-col items-center gap-4 md:gap-6">
        <h3 className="font-bold text-lg md:text-2xl mt-4 md:mt-6">
          ¿Perdiste algo valioso? ¡Regístralo ahora y comienza la búsqueda!
        </h3>
        <button className="bg-blue-950 rounded-md py-2 w-[200px] md:w-[266px] text-white">
          <Link href={'/ad/lostObjects'} className="hover:text-blue-100">
            Añadir anuncio
          </Link>
        </button>
        <p className="text-sm md:text-base text-center">
          Ahorra tiempo y preocupaciones a la hora de encontrar un objeto perdido, ya sea en el parque, hoteles, policía, taxis, aeropuertos, etc.
        </p>
      </article>

      <Image
        src={image3}
        alt="Lost objects"
        className="w-full"
      />
    </section>
  )
}
