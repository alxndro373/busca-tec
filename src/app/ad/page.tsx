import Link from "next/link";


export default function Ad(){
    return (
        <>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-6">Añadir anuncio</h1>
            <div className="w-[80%] ml-auto mr-auto">
                <h2 className="bg-[#2F2C44] text-white font-bold text-3xl py-7 text-center mb-6">Selecciona una de las siguientes opciones</h2>
            </div>
            <section className="flex justify-around">
                <article className="bg-[#DDDDDD] w-1/6 h-56 flex flex-col items-center justify-evenly">
                    <p className="text-5xl">😞</p>
                    <button className="bg-blue-950 text-white py-4 w-11/12 rounded-3xl">
                        <Link href={'/ad/lostObjects'}>Objeto perdido</Link>
                    </button>
                </article>
                <article className="bg-[#DDDDDD] w-1/6 h-56 flex flex-col items-center justify-evenly">
                    <p className="text-5xl">🙂</p>
                    <button className="bg-blue-950 text-white py-4 w-11/12 rounded-3xl">
                        <Link href={'/ad/foundObjects'}>Objeto encontrado</Link>
                    </button>
                </article>
            </section>
        </>
    )
}