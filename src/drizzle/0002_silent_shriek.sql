ALTER TABLE "corpustexts" ALTER COLUMN "entrytype" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "translations" ADD COLUMN "upvotes" numeric;--> statement-breakpoint
ALTER TABLE "translations" ADD COLUMN "downvotes" numeric;