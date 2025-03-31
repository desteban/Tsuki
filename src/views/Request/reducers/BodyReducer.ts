import { Body } from '@/models/Body';
import { FormEncoded } from '@/models/FormEncoded';

export const initialStateBody: Body = {
	form: new FormData(),
	json: '{}',
	formEncoded: [{ active: true, key: '', value: '' }],
};
const formEncodedDefault: FormEncoded = { active: false, key: '', value: '' };

export enum ActionsBodyReducer {
	reset = 'RESET',
	deleteFormEncoded = 'deleteFormEncoded',
	updateFormEncoded = 'updateFormEncoded',
}

type Action =
	| { type: ActionsBodyReducer.reset }
	| { type: ActionsBodyReducer.deleteFormEncoded; payload: { index: number } }
	| { type: ActionsBodyReducer.updateFormEncoded; payload: { index: number; item: FormEncoded } };

type ActionsHadlers = {
	[key in ActionsBodyReducer]: (state: Body, action: any) => Body;
};



export function BodyReducer(state: Body, action: Action): Body {
	const handler = actionsHandler[action.type];
	if (handler) {
		return handler(state, action);
	}

	return state;
}


const deleteFormEncoded = (state: Body, action: { payload: {index: number} }): Body => {
	return { ...state, formEncoded: state.formEncoded.filter((_, index) => index !== action.payload.index) };
};

const updateFormEncoded = (state: Body, action: { payload: { index: number; item: FormEncoded } }): Body => {
	const { index, item } = action.payload;
	const newFormEncoded = state.formEncoded;
	newFormEncoded[index] = item;

	if (index === newFormEncoded.length - 1) {
		newFormEncoded.push(formEncodedDefault);
	}

	return { ...state, formEncoded: newFormEncoded };
};

const actionsHandler: ActionsHadlers = {
	[ActionsBodyReducer.reset]: () => initialStateBody,
	[ActionsBodyReducer.deleteFormEncoded]: deleteFormEncoded,
	[ActionsBodyReducer.updateFormEncoded]: updateFormEncoded,
};