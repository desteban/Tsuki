import { Body } from '@/models/Body';
import type { FormEncoded } from '@/models/FormEncoded';
import { MultipartFormData, TypesMultiPartFormData } from '@/models/MultipartFormData';

const formEncodedDefault: FormEncoded = { active: false, key: '', value: '' };
const formMultiPartDefault: MultipartFormData = {
	active: false,
	key: '',
	type: TypesMultiPartFormData.text,
	value: '',
};
export const initialStateBody: Body = {
	form: [{ active: true, key: '', type: TypesMultiPartFormData.text, value: '' }],
	json: '{}',
	formEncoded: [{ active: true, key: '', value: '' }],
};

export enum ActionsBodyReducer {
	reset = 'RESET',
	deleteFormEncoded = 'deleteFormEncoded',
	updateFormEncoded = 'updateFormEncoded',
	updateJson = 'updateJson',
	updateFormMultipart = 'updateFormMultipart',
	deleteFormMultipart = 'deleteFormMultipart',
}

type PayloadTypes = {
	[ActionsBodyReducer.deleteFormEncoded]: { index: number };
	[ActionsBodyReducer.updateFormEncoded]: { index: number; item: FormEncoded };
	[ActionsBodyReducer.updateJson]: string | null | undefined;
	[ActionsBodyReducer.updateFormMultipart]: { index: number; item: MultipartFormData };
	[ActionsBodyReducer.deleteFormMultipart]: { index: number };
  };

  type Action<T extends ActionsBodyReducer> = {
	type: T;
  } & (T extends keyof PayloadTypes ? { payload: PayloadTypes[T] } : {});
  
  export type ActionsBody = Action<ActionsBodyReducer>;

type ActionsHadlers = {
	[key in ActionsBodyReducer]: (state: Body, action: any) => Body;
};

export function BodyReducer(state: Body, action: ActionsBody): Body {
	const handler = actionsHandler[action.type];
	if (handler) {
		return handler(state, action);
	}

	return state;
}

const deleteFormEncoded = (state: Body, action: { payload: PayloadTypes[ActionsBodyReducer.deleteFormEncoded] }): Body => {
	return { ...state, formEncoded: state.formEncoded.filter((_, index) => index !== action.payload.index) };
};

const updateFormEncoded = (state: Body, action: { payload: PayloadTypes[ActionsBodyReducer.updateFormEncoded] }): Body => {
	const { index, item } = action.payload;
	const newFormEncoded = state.formEncoded;
	newFormEncoded[index] = item;

	if (index === newFormEncoded.length - 1) {
		newFormEncoded.push(formEncodedDefault);
	}

	return { ...state, formEncoded: newFormEncoded };
};

const updateJson = (state: Body, action: { payload: string }): Body => {
	return { ...state, json: action.payload };
};

const updateFormMultipart = (state: Body, action: { payload: PayloadTypes[ActionsBodyReducer.updateFormMultipart] }): Body => {
	const { index, item } = action.payload;
	const newMultiPart = state.form;
	newMultiPart[index] = item;

	if (index === newMultiPart.length - 1) {
		newMultiPart.push(formMultiPartDefault);
	}

	return { ...state, form: newMultiPart };
};

const deleteFormMultipart = (state: Body, action: { payload: PayloadTypes[ActionsBodyReducer.deleteFormMultipart] }): Body => {
	return { ...state, form: state.form.filter((_, index) => index !== action.payload.index) };
};

const actionsHandler: ActionsHadlers = {
	[ActionsBodyReducer.reset]: () => initialStateBody,
	[ActionsBodyReducer.deleteFormEncoded]: deleteFormEncoded,
	[ActionsBodyReducer.updateFormEncoded]: updateFormEncoded,
	[ActionsBodyReducer.updateJson]: updateJson,
	[ActionsBodyReducer.updateFormMultipart]: updateFormMultipart,
	[ActionsBodyReducer.deleteFormMultipart]: deleteFormMultipart,
};
