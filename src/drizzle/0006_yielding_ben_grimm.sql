ALTER TABLE "settings" RENAME COLUMN "valueId" TO "value_id";--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "value_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "other_id" text NOT NULL;