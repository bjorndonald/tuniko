ALTER TABLE "settings" RENAME COLUMN "user" TO "actor";--> statement-breakpoint
ALTER TABLE "settings" DROP CONSTRAINT "settings_user_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_actor_users_id_fk" FOREIGN KEY ("actor") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
