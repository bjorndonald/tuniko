import Language from "./language"
import User from "./user"

export default interface CorpusText {
	id: number
	text: string,
	owner_id: number
	owner: User
	language_from_id: number
	language_from: Language
	language_to_id: number
	language_to: Language
	created_at: string
	cpdated_at: string
}