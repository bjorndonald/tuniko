import Language from "./language"
import User from "./user"

export default interface CorpusText {
	id: string
	text: string
	complexity: number
	has_chosen: boolean
	no_of_answers: number
	entry_type: string
	owner_id: string
	owner: User
	language_from_id: string
	language_from: Language
	language_to_id: string
	language_to: Language
	created_at: string
	updated_at: string
}