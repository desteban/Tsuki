import { Button } from '@/components/ui/button';
import styles from './Styles.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import ConfigurationReques from './components/ConfigurationReques';
import Params, { ItemParams } from './components/Params';
import Headers from './components/Headers';
import { Copy } from 'lucide-react';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import SelectHttpMethod from './components/SelectHttpMethod';

export default function Request() {
	const [method, setMethod] = useState<HttpMethods>('GET');
	const [params, setParams] = useState<ItemParams[]>([]);
	const [url, setUrl] = useState<string>('');

	const activeParams = params.filter(({ active }) => active);
	const paramsString = new URLSearchParams();

	activeParams.forEach(({ key, value }) => {
		paramsString.append(key, value);
	});

	const urlRequest: string = `${url}${activeParams.length !== 0 ? '?' + paramsString.toString() : ''}`;

	const ChangeUrl = (evt: ChangeEvent<HTMLInputElement>) => {
		setUrl(evt.target.value);
	};

	const Send = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	const CopyUrl = () => {
		navigator.clipboard.writeText(urlRequest);
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

					<Input
						placeholder="http://localhost:8000"
						value={url}
						onChange={ChangeUrl}
					/>

					<Button className={styles['btn-send']}>Send</Button>
				</form>

				<div className="min mt-3 flex">
					<input
						className="min-w-[50%] rounded-l-md border border-[hsl(var(--input))] bg-white px-3 py-1"
						value={urlRequest}
						disabled
					/>
					<button
						className="flex items-center justify-center rounded-r-md border border-[hsl(var(--input))] bg-accent px-2 py-1"
						onClick={CopyUrl}
					>
						<Copy height={'1em'} />
					</button>
				</div>
			</section>

			<section className="my-4">
				<ConfigurationReques
					onParams={
						<Params
							params={params}
							setParams={setParams}
							key={'query-params'}
						/>
					}
					onHeaders={<Headers />}
				/>
			</section>
		</main>
	);
}
