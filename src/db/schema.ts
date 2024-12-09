import {boolean, date, pgTable,text, varchar} from "drizzle-orm/pg-core";



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
    password: varchar("password", {length: 60})
    .notNull(),
    rol: varchar("rol", { length: 20 })
    .notNull().default("usuario")
})


export const objetos = pgTable("objetos", {
    id_object: text("id_objeto")  // Asegúrate de que el campo en el esquema de la base de datos sea 'id_objeto'
      .primaryKey()
      .$default(() => crypto.randomUUID()),
    name_object: text("nombre del objeto")
      .notNull(),
    description: text("descripcion"),
    localization: text("localizacion")
      .notNull(),
    date: date("fecha_encontrada"),
    state: text("estado_objeto")
      .notNull()
      .default("pendiente"),
    image_url: text("imagen"),
    category: text("categorias"),
    id_user: text("id_usuario").references(() => usuarios.id_user),
    estado_objeto: boolean("estado").notNull().default(false)
  })
  