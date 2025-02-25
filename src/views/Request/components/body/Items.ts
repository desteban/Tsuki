import { FormEncoded } from "@/models/FormEncoded";

export type JsonItem = {
	[key: string]: string | number | boolean | [] | object;
};

export interface DefaultBody {
	form: FormData;
	formEncoded: FormEncoded[];
	json: string | undefined | null;
}

export type KeysDefaultBody = 'none' | 'form' | 'json';

export function getContentBody(body: DefaultBody, key: KeysDefaultBody): BodyInit | null | undefined {
	if (key === 'form') {
		return body.form;
	}

	if (key === 'json') {
		return JSON.stringify(body.json);
	}

	return null;
}

export interface BodyComponentsProps {
	body: DefaultBody;
	setBody: (body: DefaultBody) => void;
}
