"use client"

import { objectType } from "@/types/objectType"
import { FC} from "react"

interface Props {
    objects: objectType[]
}

const ObjectsList: FC<Props> = ({objects}) => {

       

    return (
         
        <div className="flex gap-10 mb-10 w-11/12 ml-auto mr-auto">
        {objects && objects.map(object => (
            <div className="w-1/5 bg-white shadow-md" key={object.id_object}>
                <img 
                src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-question-mark-pattern-png-image_6070996.jpg" 
                alt="imagen del objeto perdido" 
                className="w-full h-[200px] object-cover" />
                <div>
                    <h4 className="font-bold">{object.name_object}</h4>
                    <span className="px-2 bg-red-500 text-white">{`${!object.state ? "Perdido" : "Encontrado"}`}</span>
                    <p>⌚ {object.date}</p>
                    <hr />
                    <p>💼 {object.category}</p>
                </div>
            </div>
        ))}
        </div>
    )
}

export default ObjectsList