CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chosencorpus" (
	"id" text PRIMARY KEY NOT NULL,
	"chosen" text NOT NULL,
	"corpustext" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "corpustext" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text,
	"owner" text NOT NULL,
	"language_to" text NOT NULL,
	"language_from" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "corpuscomplexities" (
	"id" text PRIMARY KEY NOT NULL,
	"score" numeric,
	"corpustext" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "corpustranslations" (
	"id" text PRIMARY KEY NOT NULL,
	"translation" text NOT NULL,
	"corpustext" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "downvotes" (
	"id" text PRIMARY KEY NOT NULL,
	"translation" text NOT NULL,
	"voter" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translation" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text,
	"translator" text NOT NULL,
	"language" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translationscores" (
	"id" text PRIMARY KEY NOT NULL,
	"translation" text NOT NULL,
	"score" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "upvotes" (
	"id" text PRIMARY KEY NOT NULL,
	"translation" text NOT NULL,
	"voter" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"password" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chosencorpus" ADD CONSTRAINT "chosencorpus_chosen_translation_id_fk" FOREIGN KEY ("chosen") REFERENCES "public"."translation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chosencorpus" ADD CONSTRAINT "chosencorpus_corpustext_corpustext_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustext"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustext" ADD CONSTRAINT "corpustext_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustext" ADD CONSTRAINT "corpustext_language_to_language_id_fk" FOREIGN KEY ("language_to") REFERENCES "public"."language"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustext" ADD CONSTRAINT "corpustext_language_from_language_id_fk" FOREIGN KEY ("language_from") REFERENCES "public"."language"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpuscomplexities" ADD CONSTRAINT "corpuscomplexities_corpustext_corpustext_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustext"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustranslations" ADD CONSTRAINT "corpustranslations_translation_translation_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corpustranslations" ADD CONSTRAINT "corpustranslations_corpustext_corpustext_id_fk" FOREIGN KEY ("corpustext") REFERENCES "public"."corpustext"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_translation_translation_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_voter_user_id_fk" FOREIGN KEY ("voter") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation" ADD CONSTRAINT "translation_translator_user_id_fk" FOREIGN KEY ("translator") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation" ADD CONSTRAINT "translation_language_language_id_fk" FOREIGN KEY ("language") REFERENCES "public"."language"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translationscores" ADD CONSTRAINT "translationscores_translation_translation_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_translation_translation_id_fk" FOREIGN KEY ("translation") REFERENCES "public"."translation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_voter_user_id_fk" FOREIGN KEY ("voter") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
