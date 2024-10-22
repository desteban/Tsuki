import { useState } from 'react';
import { DefaultBody, KeysDefaultBody } from '../components/body/Items';

export function useBody() {
	const [body, setBody] = useState<DefaultBody>({ form: new FormData(), json: '{}' });
	const [keyBody, setKeyBody] = useState<KeysDefaultBody>('none');

	return { body, setBody, keyBody, setKeyBody };
}
