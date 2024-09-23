import { Button } from '@/components/ui/button';
import styles from './Styles.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ConfigurationReques from './components/ConfigurationReques';
import Params, { ItemParams } from './components/Params';
import Headers from './components/Headers';
import { Copy } from 'lucide-react';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import SelectHttpMethod from './components/SelectHttpMethod';

function getParamsFRomUrl(url: string): URLSearchParams {
	try {
		const urlParams = new URL(url).searchParams;
		return urlParams;
	} catch (error) {
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
			console.log('borrando');

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

	const Send = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	const CopyUrl = () => {
		navigator.clipboard.writeText(url);
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
							className="w-full rounded-l-md border border-[hsl(var(--input))] bg-white px-3 py-1"
							value={url}
							onChange={ChangeUrl}
						/>
						<button
							className="flex items-center justify-center rounded-r-md border border-[hsl(var(--input))] bg-accent px-2 py-1"
							onClick={CopyUrl}
						>
							<Copy height={'1em'} />
						</button>
					</div>

					<Button className={styles['btn-send']}>Send</Button>
				</form>
			</section>

			<section className="my-4">
				<ConfigurationReques
					onParams={
						<Params
							params={params}
							setParams={setParams}
						/>
					}
					onHeaders={<Headers />}
				/>
			</section>
		</main>
	);
}
