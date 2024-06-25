ALTER TABLE "usernotification" RENAME TO "usernotifications";--> statement-breakpoint
ALTER TABLE "usernotifications" DROP CONSTRAINT "usernotification_user_users_id_fk";
--> statement-breakpoint
ALTER TABLE "usernotifications" DROP CONSTRAINT "usernotification_notifications_notifications_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usernotifications" ADD CONSTRAINT "usernotifications_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usernotifications" ADD CONSTRAINT "usernotifications_notifications_notifications_id_fk" FOREIGN KEY ("notifications") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
