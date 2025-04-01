import { useReducer, useState } from 'react';
import { Body } from '@/models/Body';
import { BodyReducer, initialStateBody } from '../reducers/BodyReducer';
import { KeysBody } from '@/models/KeysBody';

interface Props {
	initialState?: Body;
}

export function useBody({ initialState = initialStateBody }: Props) {
	const [keyBody, setKeyBody] = useState<KeysBody>('none');
	const [state, dispatch] = useReducer(BodyReducer, initialState);

	return {
		keyBody,
		setKeyBody,
		state,
		dispatch,
	};
}
