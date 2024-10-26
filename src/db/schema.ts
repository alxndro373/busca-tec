import { boolean, date, pgTable,text, varchar} from "drizzle-orm/pg-core";



export const usuarios = pgTable("usuarios",{
    id_user: text("id_usuario")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    name: varchar("nombre_usuario", {length: 25})
    .notNull(),
    email: varchar("correo_electronico", {length: 250})
    .notNull(),
    phone: varchar("numero_telefono", {length: 10})
    .notNull(),
    password: varchar("password", {length: 32})
    .notNull()

})


export const objetos = pgTable("objetos", {
    id_object: text("id_objeto")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
    name_object: text("nombre del objeto")
    .notNull(),
    description: text("descripcion"),
    localization: text("localizacion")
    .notNull(),
    date: date("fecha_encontrada"),
    state: boolean("estado_objeto").default(false),
    image_url: text("imagen"),
    category: text("categorias")
})