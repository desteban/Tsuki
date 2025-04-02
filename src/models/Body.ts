import { FormEncoded } from './FormEncoded';
import { MultipartFormData } from './MultipartFormData';

export type Body = {
	form: MultipartFormData[];
	formEncoded: FormEncoded[];
	json: string | undefined | null;
};
