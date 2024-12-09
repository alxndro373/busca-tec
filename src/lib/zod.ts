import { object, string, z } from "zod"

export const loginSchema = object({
  email: string({ required_error: "El correo es solicitado" })
    .min(1, "El correo es requerido")
    .email("Correo invalido"),
  password: string({ required_error: "La contraseña es solicitada" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
})


export const registerSchema = object({
  user: string({required_error: "El nombe de usuario es solicitado"})
    .min(1, "El nombre de usuario es requerido")
    .regex(new RegExp(/^[a-zA-Z]+$/), "Nombre de usuario no valido"),
  phone: string({required_error: "El número de telefono es solicitado"})
    .min(1, "El numero de telefono es requerido")
    .max(10, "El numero de telefono no puede ser mayor de 10 digitos"),
  email: string({ required_error: "El correo es solicitado" })
    .min(1, "El correo es requerido")
    .email("Correo invalido"),
  password: string({ required_error: "La contraseña es solicitada" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
  confirmPassword: string({ required_error: "La confirmación de contraseña es solicitada" })
    .min(1, "La confirmacion de contraseña es requerida")
})


export const objectSchema = z.object({
  file: z.instanceof(File, {message: "selecciona una imagen"})
  .refine(file => {
    return file.size < 5 * 1024 * 1024 
  }, {message: "la imagen debe ser menos de 5MB"})
  .refine((file) => {
    return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "image/jpg" // Tipos permitidos
  }, {
    message: 'Solo se permiten archivos JPEG y PNG y JPG.',
  }),
  name_object: string().min(4,"El nombre del objeto es requerido"),
  description: string(),
  localization: string().min(1,"La localización es requerida"),
  category: string(),
  state: string(),
  estado_objeto: z.boolean()
})