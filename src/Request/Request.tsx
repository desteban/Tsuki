import { Button } from '@/components/ui/button';
import styles from './Styles.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ConfigurationReques from './components/ConfigurationReques';
import Params, { ItemParams } from './components/Params';
import Headers from './components/Headers';
import { Check, Copy } from 'lucide-react';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import SelectHttpMethod from './components/SelectHttpMethod';

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
	const [isClicked, setIsClicked] = useState<boolean>(false);

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

	const ChangeUrl = (evt: ChangeEvent<HTMLInputElement>) => {
		setUrl(evt.target.value);
	};

	const Send = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		console.log('request to', method, url);
		const response = await fetch(url, { method: method });
		console.log(response);
	};

	const CopyUrl = () => {
		navigator.clipboard.writeText(url);
		setIsClicked(true);

		setTimeout(() => {
			setIsClicked(false);
		}, 500);
	};

	return (
		<main>
			<section aria-label="config of request">
				<form
					className={styles.form}
					onSubmit={Send}
				>
					<div className="w-48">
						<SelectHttpMethod
							method={method}
							changeMethod={setMethod}
						/>
					</div>
					<div className="flex w-full">
						<input
							className="w-full rounded-l-md border border-haiti-800 px-3 py-1 focus:outline-haiti-900"
							value={url}
							placeholder="http://localhost:8000"
							onChange={ChangeUrl}
						/>
						<button
							className="flex items-center justify-center rounded-r-md border border-l-0 border-haiti-800 bg-[#e5e0eb] bg-accent px-2 py-1"
							onClick={CopyUrl}
						>
							{isClicked ? (
								<Check
									height={'1em'}
									className="stroke-green-800"
									strokeWidth={4}
								/>
							) : (
								<Copy
									height={'1em'}
									className="stroke-mercury-950"
								/>
							)}
						</button>
					</div>

					<Button className={styles['btn-send']}>Send</Button>
				</form>
			</section>

			<section className="my-4">
				<ConfigurationReques
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
