import { useEffect, useRef, useState } from 'react';
import ConfigurationRequest from './components/ConfigurationRequest';
import Headers from './components/Headers/Headers';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { ItemParams } from './components/Params/ItemParams';
import { headersDefault, ItemHeader } from './components/Headers/ItemHeader';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { RequestUrl } from '@lib/Request';
import { DefaultBody, getBody, KeysDefaultBody } from './components/body/Items';
import MainBody from './components/body/MainBody';
import BodyForm from './components/body/BodyForm/BodyForm';
import BodyJson from './components/body/BodyJson';

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
	const [params, setParams] = useState<ItemParams[]>([{ active: true, key: '', value: '' }]);
	const [headers, setHeaders] = useState<ItemHeader[]>([
		...headersDefault,
		{ allowDelete: true, isActive: false, key: '', value: '' },
	]);
	const [url, setUrl] = useState<string>('');
	const [body, setBody] = useState<DefaultBody>({ form: new FormData(), json: '{}	' });
	const [keyBody, setKeyBody] = useState<KeysDefaultBody>('none');

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

		if (paramsFromUrl.size < params.length && paramsFromUrl.size !== 0) {
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

			const oldParams = params.filter((param, index) => !indexActive.includes(index) && !param.active);
			setParams([...newParams, ...oldParams]);
		}
	}, [url]);

	const Send = async () => {
		abortController.current = new AbortController();
		setLoad(true);
		const respuesta = await RequestUrl({
			url,
			method,
			abortController: abortController.current,
			headers: FormatterHeadersInit(headers),
			body: keyBody !== undefined ? getBody(body, keyBody) : null,
		});

		if (respuesta.isLeft()) {
			console.error(respuesta.left);
		}
		setLoad(false);
	};

	const CancelReques = () => {
		console.log('cancel....');

		abortController.current?.abort();
		setLoad(false);
	};

	return (
		<main className="h-full overflow-auto">
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
					onBody={
						<MainBody
							tab={keyBody}
							changeTab={(tab) => {
								setKeyBody(tab as KeysDefaultBody);
							}}
							onBodyForm={
								<BodyForm
									body={body}
									setBody={setBody}
								/>
							}
							onBodyJson={
								<BodyJson
									body={body}
									setBody={setBody}
								/>
							}
						/>
					}
				/>
			</section>
		</main>
	);
}
