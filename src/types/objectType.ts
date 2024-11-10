

export type objectType = {
    id_object: string,
    name_object: string,
    description: string | null,
    localization: string,
    date: string | null,
    state: boolean | null,
    category: string | null,
    image_url: string | null | undefined,
    id_user: string | null,
    phone?: string
}


export type objectTypeByUser = Omit<objectType,'phone'>