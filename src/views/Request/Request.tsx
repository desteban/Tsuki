import { useRef, useState } from 'react';
import ConfigurationRequest from './components/ConfigurationRequest';
import Headers from './components/Headers/Headers';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { RequestUrl } from '@lib/Request';
import { getContentBody, KeysDefaultBody } from './components/body/Items';
import MainBody from './components/body/MainBody';
import BodyForm from './components/body/BodyForm/BodyForm';
import BodyJson from './components/body/BodyJson';
import { useHeaders } from './Hooks/useHeaders';
import { useUrl } from './Hooks/useUrl';
import { useBody } from './Hooks/useBody';

export default function Request() {
	const [load, setLoad] = useState<boolean>(false);
	const abortController = useRef<AbortController | null>(null);
	const [method, setMethod] = useState<HttpMethods>('GET');
	const { params, setParams, setUrl, url, handleParamsFromUrl } = useUrl();
	const { headers, setHeaders, deleteHeader, handleHeader } = useHeaders();
	const { body, keyBody, setBody, setKeyBody } = useBody();

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

	const CancelRequest = () => {
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
				setUrl={handleParamsFromUrl}
				setMethod={setMethod}
				onCancelled={CancelRequest}
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
							deleteHeader={deleteHeader}
							handleHeader={handleHeader}
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
