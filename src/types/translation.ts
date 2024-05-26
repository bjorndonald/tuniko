import Language from "./language"
import User from "./user"

export default interface Translation {
    id: number
    text: string
    translator_id: number
    translator: User
    upvotes: number
    downvotes: number
    language_id: number
    language: Language
    corpus: number
    created_at: string
    updated_at: string
}