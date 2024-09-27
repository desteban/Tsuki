import { HttpMethods } from './Types/HttpMethods';

type RequestProps = {
	url: string;
	headers?: HeadersInit;
	abortController?: AbortController;
	method?: HttpMethods;
	body?: string;
};

export async function Request({
	url,
	headers,
	abortController,
	method = 'GET',
	body,
}: RequestProps) {
	let bodyRequest = body;
	if (method === 'GET') {
		bodyRequest = undefined;
	}

	return fetch(url, {
		method: method,
		headers,
		signal: abortController?.signal,
		body: bodyRequest,
	}).catch((err: Error) => {
		if (err.name == 'Abort Controller') {
			console.error('Request Abort...');
		}
	});
}
