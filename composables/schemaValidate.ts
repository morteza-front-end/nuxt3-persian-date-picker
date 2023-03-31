import {string,object} from 'yup'
export const useSideValidator = ()=>{
	const schema = object({
		dateOfBirth: string().required()
	})
	return {schema}
}