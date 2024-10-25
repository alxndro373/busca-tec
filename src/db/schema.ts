import { pgTable,text, varchar} from "drizzle-orm/pg-core";



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