import { useEffect, useRef, useState } from 'react';
import ConfigurationRequest from './components/ConfigurationReques';
import Headers from './components/Headers/Headers';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { ItemParams } from './components/Params/ItemParams';
import { ItemHeader } from './components/Headers/ItemHeader';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { Request as RequestUrl } from '@lib/Request';

function getParamsFRomUrl(url: string): URLSearchParams {
	try {
		const urlParams = new URL(url).searchParams;
		return urlParams;
	} catch (error) {
		const index = url.indexOf('?');
		if (index > -1) {
			const data = url.substring(index + 1);
			return new URL(`http://localhost:8000?${data}`).searchParams;
		}

		return new URLSearchParams();
	}
}

export default function Request() {
	const [load, setLoad] = useState<boolean>(false);
	const abortController = useRef<AbortController | null>(null);
	const [method, setMethod] = useState<HttpMethods>('GET');
	const [params, setParams] = useState<ItemParams[]>([]);
	const [headers, setHeaders] = useState<ItemHeader[]>([
		{ isActive: true, key: 'Accept', value: '*/*' },
		{ isActive: true, key: 'User-Agent', value: 'Tsuki' },
		{ isActive: false, key: '', value: '' },
	]);
	const [url, setUrl] = useState<string>('');

	useEffect(() => {
		const paramsFromUrl = getParamsFRomUrl(url);

		if (paramsFromUrl.size >= params.length) {
			const newParams: ItemParams[] = [...params];
			for (const [key, value] of paramsFromUrl) {
				const index = newParams.findIndex((param) => {
					return key == param.key || key.slice(0, -1) == param.key || key == param.key.slice(0, -1);
				});

				if (index !== -1) {
					newParams[index].key = key;
					newParams[index].value = value;
					newParams[index].active = true;
				} else {
					newParams.push({ key, value, active: true });
				}
			}
			setParams(newParams);
		}

		if (paramsFromUrl.size < params.length) {
			const newParams: ItemParams[] = [];
			const indexActive: number[] = [];
			for (const [key, value] of paramsFromUrl) {
				const index = params.findIndex((param) => {
					return key == param.key || key.slice(0, -1) == param.key || key == param.key.slice(0, -1);
				});

				if (index !== -1) {
					const auxParam = params[index];
					auxParam.key = key;
					auxParam.value = value;
					auxParam.active = true;
					newParams.push(auxParam);
					indexActive.push(index);
				}
			}

			const oldParams = params.filter(
				(param, index) => !indexActive.includes(index) && !param.active,
			);
			setParams([...newParams, ...oldParams]);
		}
	}, [url]);

	const Send = async () => {
		abortController.current = new AbortController();
		setLoad(true);
		RequestUrl({
			url,
			method,
			headers: FormatterHeadersInit(headers),
			abortController: abortController.current,
		})
			.then((response) => console.log('response', response))
			.finally(() => {
				setLoad(false);
			});
	};

	const CancelReques = () => {
		console.log('cancel....');

		abortController.current?.abort();
		setLoad(false);
	};

	return (
		<main>
			<FormUrl
				load={load}
				url={url}
				method={method}
				onSend={Send}
				setUrl={setUrl}
				setMethod={setMethod}
				onCancelled={CancelReques}
			/>

			<section className="my-4">
				<ConfigurationRequest
					onParams={
						<Params
							url={url}
							params={params}
							setParams={setParams}
							setUrl={setUrl}
						/>
					}
					onHeaders={
						<Headers
							headers={headers}
							setHeaders={setHeaders}
						/>
					}
				/>
			</section>
		</main>
	);
}
