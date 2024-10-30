ALTER TABLE "objetos" ADD COLUMN "id_usuario" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "objetos" ADD CONSTRAINT "objetos_id_usuario_usuarios_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id_usuario") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
