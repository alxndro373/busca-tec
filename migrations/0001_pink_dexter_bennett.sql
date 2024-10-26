CREATE TABLE IF NOT EXISTS "objetos" (
	"id_objeto" text PRIMARY KEY NOT NULL,
	"descripcion" text,
	"localizacion" text NOT NULL,
	"fecha_encontrada" date,
	"estado_objeto" boolean DEFAULT false,
	"imagen" text
);
--> statement-breakpoint
ALTER TABLE "usuarios" ALTER COLUMN "password" SET NOT NULL;