
export default interface Setting {
    id?: string
	type: string
	action: string
	actor: string
	value: string
	value_obj?: any
	value_id: string
	created_at?: string
	updated_at?: string
}