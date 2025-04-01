import ConfigurationRequest from './components/ConfigurationRequest';
import Headers from './components/Headers/Headers';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { FormatterHeadersInit } from '@/lib/FormatterHeadersInit';
import { RequestUrl } from '@lib/RequestUrl';
import { getContentBody } from './components/body/utils/getContentBody';
import { useRequest } from './Hooks/useRequest';
import { DataResponse } from '@/lib/RequestUrl';
import MainBody from './components/body/MainBody';
import BodyJson from './components/body/BodyJson';
import FormEncoded from './components/body/FormEncoded';
import { ActionsBodyReducer } from './reducers/BodyReducer';
import { KeysBody } from '@/models/KeysBody';

interface RequestProps {
	setResponse: (response: DataResponse | null) => void;
}

export default function Request({ setResponse }: RequestProps) {
	const hookRequest = useRequest();
	const { abortController, setLoad, url, method, headers, setHeaders, body } = hookRequest;

	const Send = async () => {
		abortController.current = new AbortController();
		setLoad(true);
		const bodyContent =  body.keyBody !== undefined ? getContentBody(body.state, body.keyBody) : null
		const respuesta = await RequestUrl({
			url,
			methodType: method,
			abortController: abortController.current,
			headers: FormatterHeadersInit(headers),
			body: bodyContent,
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

	const changeJson = (json: string | null | undefined) => {
		body.dispatch({ type: ActionsBodyReducer.updateJson, payload: json });
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
							headers={headers}
							setHeaders={setHeaders}
							tab={body.keyBody}
							changeTab={(tab) => {
								body.setKeyBody(tab as KeysBody);
							}}
							onBodyJson={
								<BodyJson
									content={body.state.json}
									updateContent={changeJson}
								/>
							}
							onBodyFormEncoded={
								<FormEncoded
									state={body.state}
									dispatch={body.dispatch}
								/>
							}
						/>
					}
				/>
			</section>
		</div>
	);
}
