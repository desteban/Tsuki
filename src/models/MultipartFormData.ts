interface MultipartFormDataBase {
	key: string;
	active: boolean;
	type: TypesMultiPartFormData;
}

export type MultipartFormData =
	| (MultipartFormDataBase & { type: TypesMultiPartFormData.text; value: string })
	| (MultipartFormDataBase & { type: TypesMultiPartFormData.file; value: File | null });

export enum TypesMultiPartFormData {
	text = 'text',
	file = 'file',
}
