import { HttpMethods } from '@/lib/Types/HttpMethods';
import { useRef, useState } from 'react';
import { useUrl } from './useUrl';
import { useHeaders } from './useHeaders';
import { useBody } from './useBody';

export function useRequest() {
	const [load, setLoad] = useState<boolean>(false);
	const abortController = useRef<AbortController | null>(null);
	const [method, setMethod] = useState<HttpMethods>('GET');
	const { params, setParams, setUrl, url, handleParamsFromUrl } = useUrl();
	const { headers, setHeaders, deleteHeader, handleHeader } = useHeaders();
	const { body, keyBody, setBody, setKeyBody } = useBody();

	return {
		load,
		setLoad,
		abortController,
		method,
		setMethod,
		params,
		setParams,
		setUrl,
		url,
		handleParamsFromUrl,
		headers,
		setHeaders,
		deleteHeader,
		handleHeader,
		body,
		keyBody,
		setBody,
		setKeyBody,
	};
}
