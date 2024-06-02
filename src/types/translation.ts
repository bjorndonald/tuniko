import Language from "./language"
import User from "./user"

export default interface Translation {
    id: string
    text: string
    score: number
    translator_id: string
    translator: User
    upvotes: number
    downvotes: number
    language_id: string
    language: Language
    corpus: string
    created_at: string
    updated_at: string
}

export type Vote = "upvote" | "downvote" | "none"