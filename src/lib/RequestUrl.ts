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

export type DataResponse = {
	size: string,
	time: string,
	response: Response
}

export async function RequestUrl({
	url,
	abortController,
	body,
	headers,
	method = 'GET',
}: RequestProps): Promise<Either<ErrorRequest, DataResponse>> {
	let bodyRequest: BodyInit | null | undefined = body;
	const either = new Either<ErrorRequest, DataResponse>();

	if (method === 'GET') {
		bodyRequest = null;
	}

	const startTime = performance.now();
	try {
		const response = await fetch(url, { method, headers, signal: abortController?.signal, body: bodyRequest });
		const endTime = performance.now();
		const elapsedTime = (endTime - startTime).toFixed(0);

		if (response.ok === undefined) {
			either.setLeft(new RequestFailed());
		}

		const buffer = await response.clone().arrayBuffer()
		const size = (buffer.byteLength / 1000).toFixed(2)

		either.setRight({time: elapsedTime, response, size});
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
