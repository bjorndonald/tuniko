ALTER TABLE "corpustexts" RENAME COLUMN "entryType" TO "entrytype";--> statement-breakpoint
ALTER TABLE "corpustexts" ALTER COLUMN "entrytype" SET DATA TYPE entrytype;