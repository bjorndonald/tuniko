import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    numeric,
    boolean,
    varchar
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    password: text("password"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
)

export const languages = pgTable("languages", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const corpusTexts = pgTable("corpustexts", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    text: text("text"),
    entryType: varchar("entrytype"),
    owner: text("owner")
            .notNull()
        .references(() => users.id, { onUpdate: "cascade", onDelete: "cascade" }),
    language_to: text("language_to")
        .notNull()
        .references(() => languages.id, { onDelete: "cascade" }),
    language_from: text("language_from")
        .notNull()
        .references(() => languages.id, { onDelete: "cascade" }),
    no_translations: numeric("no_translations").default('0'),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const translations = pgTable("translations", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    text: text("text"),
    translator: text("translator")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    language_to: text("language")
        .notNull()
        .references(() => languages.id, { onDelete: "cascade" }),
    upvotes: numeric("upvotes"),
    downvotes: numeric("downvotes"),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const chosencorpus = pgTable("chosencorpus", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    chosen: text("chosen")
        .notNull()
        .references(() => translations.id, { onDelete: "cascade" }),
    corpustext: text("corpustext")
        .notNull()
        .references(() => corpusTexts.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const corpustranslations = pgTable("corpustranslations", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    translation: text("translation")
        .notNull()
        .references(() => translations.id, { onDelete: "cascade" }),
    corpustext: text("corpustext")
        .notNull()
        .references(() => corpusTexts.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const corpuscomplexities = pgTable("corpuscomplexities", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    score: numeric("score"),
    corpustext: text("corpustext")
        .notNull()
        .references(() => corpusTexts.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const translationscores = pgTable("translationscores", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    translation: text("translation")
        .notNull()
        .references(() => translations.id, { onDelete: "cascade" }),
    score: numeric("score"),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const userscore = pgTable("userscore", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    user: text("userid")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    score: numeric("score"),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const upvotes = pgTable("upvotes", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    translation: text("translation")
        .notNull()
        .references(() => translations.id, { onDelete: "cascade" }),
    voter: text("voter")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const downvotes = pgTable("downvotes", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    translation: text("translation")
        .notNull()
        .references(() => translations.id, { onDelete: "cascade" }),
    voter: text("voter")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const settings = pgTable("settings", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    type: text("type").notNull(),
    value: text("value").notNull(),
    action: text("action").notNull(),
    actor: text("actor")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    valueId: text("value_id").notNull(),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const notifications = pgTable("notifications", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    action: text("action").notNull(),
    value: text("value").notNull(),
    valueId: text("value_id").notNull(),
    otherId: text("other_id").notNull(),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})

export const userNotifications = pgTable("usernotifications", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    user: text("user")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    notification: text("notification")
        .notNull()
        .references(() => notifications.id, { onDelete: "cascade" }),
    seen: boolean("seen"),
    created_at: timestamp("created_at", { mode: "date" }),
    updated_at: timestamp("updated_at", { mode: "date" })
})