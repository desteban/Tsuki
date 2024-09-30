import { Either } from './Either';
import { ConnectionFailed } from './errors/ConnectionFailed';
import { RequestFailed } from './errors/RequestFailed';
import { HttpMethods } from './Types/HttpMethods';

type RequestProps = {
	url: string;
	headers?: HeadersInit;
	abortController?: AbortController;
	method?: HttpMethods;
	body?: BodyInit | null;
};

type ErrorRequest = AbortController | ConnectionFailed | RequestFailed | Error;

export async function RequestUrl({
	url,
	abortController,
	body,
	headers,
	method = 'GET',
}: RequestProps): Promise<Either<ErrorRequest, Response>> {
	let bodyRequest: BodyInit | null | undefined = body;
	const either = new Either<ErrorRequest, Response>();
	if (method === 'GET') {
		bodyRequest = null;
	}

	try {
		const response = await fetch(url, { method, headers, signal: abortController?.signal, body: bodyRequest });

		if (response.ok === undefined) {
			either.setLeft(new RequestFailed());
		}

		either.setRight(response);
	} catch (error) {
		either.setLeft(error as Error);
		if (error instanceof DOMException && error.name === 'AbortError') {
			either.setLeft(new AbortController());
		}

		if (!navigator.onLine) {
			console.error('disconnected, check yor connection');
			either.setLeft(new ConnectionFailed());
		}
	}

	return either;
}
