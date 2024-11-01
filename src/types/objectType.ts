
/*
export type objectType = {
    id_object: string
    name_object: string,
    description: string ,
    localization: string
    state: boolean | null
    date: string | null
    image_url: string | null
}

*/

export type objectType = {
    id_object: string,
    name_object: string,
    description: string | null,
    localization: string,
    date: string | null,
    state: boolean | null,
    category: string | null,
    image: string | null,
    id_user: string | null,
    phone: string
}