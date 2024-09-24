import { useEffect, useState } from 'react';
import ConfigurationRequest from './components/ConfigurationReques';
import Headers from './components/Headers/Headers';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import FormUrl from './components/FormUrl';
import Params from './components/Params/Params';
import { ItemParams } from './components/Params/ItemParams';

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
	const [method, setMethod] = useState<HttpMethods>('GET');
	const [params, setParams] = useState<ItemParams[]>([]);
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
		console.log('request to', method, url);
		const response = await fetch(url, { method: method });
		console.log(response);
	};

	return (
		<main>
			<FormUrl
				url={url}
				method={method}
				onSend={Send}
				setUrl={setUrl}
				setMethod={setMethod}
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
					onHeaders={<Headers />}
				/>
			</section>
		</main>
	);
}
