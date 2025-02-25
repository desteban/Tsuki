import { HttpMethods } from '../lib/Types/HttpMethods';

export interface Requests {
	requests: RequestModel[];
}

export interface RequestModel {
	id: number;
	methodType: HttpMethods;
	url: string;
	body: string;
	headers: Header[];
	isSave: boolean;
}

export interface Header {
	key: string;
	value: string;
}
