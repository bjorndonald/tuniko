CREATE TABLE IF NOT EXISTS "userscore" (
	"id" text PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"score" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "translation" RENAME TO "translations";--> statement-breakpoint
ALTER TABLE "chosencorpus" DROP CONSTRAINT "chosencorpus_chosen_translation_id_fk";
--> statement-breakpoint
ALTER TABLE "corpustranslations" DROP CONSTRAINT "corpustranslations_translation_translation_id_fk";
--> statement-breakpoint
ALTER TABLE "downvotes" DROP CONSTRAINT "downvotes_translation_translation_id_fk";
--> statement-breakpoint
ALTER TABLE "translations" DROP CONSTRAINT "translation_translator_users_id_fk";
--> statement-breakpoint
ALTER TABLE "translations" DROP CONSTRAINT "translation_language_languages_id_fk";
--> statement-breakpoint
ALTER TABLE "translationscores" DROP CONSTRAINT "translationscores_translation_translation_id_fk";
--> statement-breakpoint
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_translation_translation_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userscore" ADD CONSTRAINT "userscore_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chosencorpus" ADD CONSTRAINT "chosencorpus_chosen_translations_id_fk" FOREIGN KEY ("chosen") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustranslations" ADD CONSTRAINT "corpustranslations_translation_translations_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_translation_translations_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translations" ADD CONSTRAINT "translations_translator_users_id_fk" FOREIGN KEY ("translator") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translations" ADD CONSTRAINT "translations_language_languages_id_fk" FOREIGN KEY ("language") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translationscores" ADD CONSTRAINT "translationscores_translation_translations_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_translation_translations_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
