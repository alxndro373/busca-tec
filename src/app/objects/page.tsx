import Image from "next/image"



export default function Objects(){


    return (
        <main>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
            <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">Aqui encontraras una amplia variedad de objetos perdidos y encontrados.</p>
            <h3 className="text-center font-bold text-2xl mb-2">Todos los objetos</h3>
            <div className="flex justify-between border-2 border-gray-200 mb-8 p-4 w-11/12 ml-auto mr-auto">
                <select>
                    <option value="">Ordenar por</option>
                </select>
                <select>
                    <option value="">Filtrar por</option>
                </select>
            </div>
            <div className="flex gap-10 mb-10 w-11/12 ml-auto mr-auto">
                <div className="w-1/5 bg-white shadow-md">
                    <img src="https://www.idevice.ro/wp-content/uploads/2024/02/iphone-16-forma-camere.jpg" alt="" className="w-full h-[200px] object-cover" />
                    <div>
                        <h4 className="font-bold">Phone 16</h4>
                        <span className="px-2 bg-red-500 text-white">Perdido</span>
                        <p>⌚12-02-2024</p>
                        <hr />
                        <p>💼Electronica</p>
                    </div>
                </div>
                <div className="w-1/5 bg-white shadow-md ">
                    <img src="https://th.bing.com/th/id/OIP.YXJ-h7nZF0qE485OQZvk5wHaHa?rs=1&pid=ImgDetMain" alt="" className="w-full h-[200px] object-cover" />
                    
                    <div>
                        <h4 className="font-bold">Xbox x</h4>
                        <span className="px-2 bg-red-500 text-white">Perdido</span>
                        <p>⌚15-02-2024</p>
                        <hr />
                        <p>💼Electronica</p>
                    </div>
                </div>
            </div>
        </main>
    )
}