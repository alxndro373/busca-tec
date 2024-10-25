CREATE TABLE IF NOT EXISTS "usuarios" (
	"id_usuario" text PRIMARY KEY NOT NULL,
	"nombre_usuario" varchar(25) NOT NULL,
	"correo_electronico" varchar(250) NOT NULL,
	"numero_telefono" varchar(10) NOT NULL,
	"password" varchar(32) NOT NULL
);
