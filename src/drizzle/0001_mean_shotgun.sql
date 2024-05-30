ALTER TABLE "corpustext" RENAME TO "corpustexts";--> statement-breakpoint
ALTER TABLE "language" RENAME TO "languages";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "languages" RENAME COLUMN "text" TO "name";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "chosencorpus" DROP CONSTRAINT "chosencorpus_corpustext_corpustext_id_fk";
--> statement-breakpoint
ALTER TABLE "corpustexts" DROP CONSTRAINT "corpustext_owner_user_id_fk";
--> statement-breakpoint
ALTER TABLE "corpustexts" DROP CONSTRAINT "corpustext_language_to_language_id_fk";
--> statement-breakpoint
ALTER TABLE "corpustexts" DROP CONSTRAINT "corpustext_language_from_language_id_fk";
--> statement-breakpoint
ALTER TABLE "corpuscomplexities" DROP CONSTRAINT "corpuscomplexities_corpustext_corpustext_id_fk";
--> statement-breakpoint
ALTER TABLE "corpustranslations" DROP CONSTRAINT "corpustranslations_corpustext_corpustext_id_fk";
--> statement-breakpoint
ALTER TABLE "downvotes" DROP CONSTRAINT "downvotes_voter_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "translation" DROP CONSTRAINT "translation_translator_user_id_fk";
--> statement-breakpoint
ALTER TABLE "translation" DROP CONSTRAINT "translation_language_language_id_fk";
--> statement-breakpoint
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_voter_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chosencorpus" ADD CONSTRAINT "chosencorpus_corpustext_corpustexts_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustexts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustexts" ADD CONSTRAINT "corpustexts_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustexts" ADD CONSTRAINT "corpustexts_language_to_languages_id_fk" FOREIGN KEY ("language_to") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustexts" ADD CONSTRAINT "corpustexts_language_from_languages_id_fk" FOREIGN KEY ("language_from") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpuscomplexities" ADD CONSTRAINT "corpuscomplexities_corpustext_corpustexts_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustexts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustranslations" ADD CONSTRAINT "corpustranslations_corpustext_corpustexts_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustexts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_voter_users_id_fk" FOREIGN KEY ("voter") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation" ADD CONSTRAINT "translation_translator_users_id_fk" FOREIGN KEY ("translator") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation" ADD CONSTRAINT "translation_language_languages_id_fk" FOREIGN KEY ("language") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_voter_users_id_fk" FOREIGN KEY ("voter") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
