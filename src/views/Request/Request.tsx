import { useRef, useState } from 'react';
import ConfigurationRequest from './components/ConfigurationRequest';
import Headers from './components/Headers/Headers';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { ItemParams } from './components/Params/ItemParams';
import { headersDefault, ItemHeader } from './components/Headers/ItemHeader';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { RequestUrl } from '@lib/Request';
import { DefaultBody, getContentBody, KeysDefaultBody } from './components/body/Items';
import MainBody from './components/body/MainBody';
import BodyForm from './components/body/BodyForm/BodyForm';
import BodyJson from './components/body/BodyJson';

function getParamsFromUrl(url: string): URLSearchParams {
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
	const [body, setBody] = useState<DefaultBody>({ form: new FormData(), json: '{}' });
	const [keyBody, setKeyBody] = useState<KeysDefaultBody>('none');

	const Send = async () => {
		abortController.current = new AbortController();
		setLoad(true);
		const respuesta = await RequestUrl({
			url,
			method,
			abortController: abortController.current,
			headers: FormatterHeadersInit(headers),
			body: keyBody !== undefined ? getContentBody(body, keyBody) : null,
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

	const handleParamsFromUrl = (url: string) => {
		const oldParams = params.filter((param) => param.key.length !== 0 || param.value.length !== 0);
		const paramsUrl = getParamsFromUrl(url);
		const activeParams: { index: number; param: ItemParams }[] = [];
		const newParams: ItemParams[] = [];
		oldParams.map((params, index) => {
			if (!params.active) {
				activeParams.push({ index, param: params });
			}
		});
		paramsUrl.forEach((value, key) => {
			newParams.push({ key, value, active: true });
		});

		activeParams.map(({ index, param }) => {
			newParams.splice(index, 0, param);
		});

		setParams([...newParams, { active: false, key: '', value: '' }]);
		setUrl(url);
	};

	return (
		<main className="h-full overflow-auto">
			<FormUrl
				load={load}
				url={url}
				method={method}
				onSend={Send}
				setUrl={handleParamsFromUrl}
				setMethod={setMethod}
				onCancelled={CancelReques}
			/>

			<section className="my-4">
				<ConfigurationRequest
					onParams={
						<Params
							url={url}
							params={params}
							setUrl={setUrl}
							setParams={setParams}
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
									setBody={(body) => {
										//obtener headers de configuración
										const headersConfig = headers.filter((header) => !header.allowDelete);
										//copia de los headers actuales
										const newHeaders = [...headers];

										//agregar el nuevo header a la copia
										newHeaders.splice(headersConfig.length, 0, {
											allowDelete: false,
											isActive: true,
											key: 'Content-Type',
											value: 'application/json',
										});
										//actualizar los headers
										setHeaders(newHeaders);

										//actualizar el body de la petición
										setBody(body);
									}}
								/>
							}
						/>
					}
				/>
			</section>
		</main>
	);
}
