import ConfigurationRequest from './components/ConfigurationRequest';
import Headers from './components/Headers/Headers';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { RequestUrl } from '@lib/RequestUrl';
import { getContentBody, KeysDefaultBody } from './components/body/Items';
import { BodyForm, MainBody, BodyJson } from './components/body';
import { useRequest } from './Hooks/useRequest';
import { DataResponse } from '@/lib/RequestUrl';

interface RequestProps {
	setResponse: (response: DataResponse | null) => void;
}

export default function Request({ setResponse }: RequestProps) {
	const hookRequest = useRequest();
	const { abortController, setLoad, setKeyBody, url, method, headers, keyBody, body } = hookRequest;

	const Send = async () => {
		abortController.current = new AbortController();
		setLoad(true);
		const respuesta = await RequestUrl({
			url,
			methodType: method,
			abortController: abortController.current,
			headers: FormatterHeadersInit(headers),
			body: keyBody !== undefined ? getContentBody(body, keyBody) : null,
		});

		setLoad(false);
		if (respuesta.isLeft()) {
			console.error(respuesta.left);
		}

		if (respuesta.isRight()) {
			setResponse(respuesta.Right());
		}
	};

	const CancelRequest = () => {
		abortController.current?.abort();
		setLoad(false);
	};

	return (
		<div className="h-full overflow-auto">
			<FormUrl
				load={hookRequest.load}
				url={hookRequest.url}
				method={hookRequest.method}
				setUrl={hookRequest.handleParamsFromUrl}
				setMethod={hookRequest.setMethod}
				onSend={Send}
				onCancelled={CancelRequest}
			/>

			<section className="my-4">
				<ConfigurationRequest
					onParams={
						<Params
							url={hookRequest.url}
							params={hookRequest.params}
							setUrl={hookRequest.setUrl}
							setParams={hookRequest.setParams}
						/>
					}
					onHeaders={
						<Headers
							headers={hookRequest.headers}
							setHeaders={hookRequest.setHeaders}
							deleteHeader={hookRequest.deleteHeader}
							handleHeader={hookRequest.handleHeader}
						/>
					}
					onBody={
						<MainBody
							headers={hookRequest.headers}
							setHeaders={hookRequest.setHeaders}
							tab={hookRequest.keyBody}
							changeTab={(tab) => {
								setKeyBody(tab as KeysDefaultBody);
							}}
							onBodyForm={
								<BodyForm
									body={hookRequest.body}
									setBody={hookRequest.setBody}
								/>
							}
							onBodyJson={
								<BodyJson
									body={hookRequest.body}
									setBody={hookRequest.setBody}
								/>
							}
						/>
					}
				/>
			</section>
		</div>
	);
}
