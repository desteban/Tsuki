import { useState } from 'react';
import { KeysDefaultBody } from '../components/body/Items';
import { FormEncoded } from "@models/FormEncoded";
import { Body } from '@/models/Body';

const initialState: Body = { form: new FormData(), json: '{}', formEncoded: [] };


export function useBody() {
	const [body, setBody] = useState<Body>(initialState);
	const [keyBody, setKeyBody] = useState<KeysDefaultBody>('none');

	const changeJson = (json: string) => {
		setBody({ ...body, json });
	};

	const addFormEncoded = (formEncoded: FormEncoded) => {
		setBody({ ...body, formEncoded: [...body.formEncoded, formEncoded] });
	};

	const deleteFormEncoded = (index: number) => {
		const newFormEncoded = body.formEncoded.filter((_, i) => i !== index);
		setBody({ ...body, formEncoded: newFormEncoded });
	};

	const handleFormEncoded = (index: number, formEncoded: FormEncoded) => {
		const newFormEncoded = body.formEncoded.map((item, i) => {
			if (i !== index) {
				return item;
			}

			return formEncoded;
		});
		setBody({ ...body, formEncoded: newFormEncoded });
	};

	const reset = () => {
		setBody(initialState);
	};

	return {
		body,
		setBody,
		keyBody,
		setKeyBody,
		changeJson,
		addFormEncoded,
		reset,
		deleteFormEncoded,
		handleFormEncoded,
	};
}
