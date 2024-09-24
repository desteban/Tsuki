import styles from '../Styles.module.css';
import { Check, Copy } from 'lucide-react';
import SelectHttpMethod from './SelectHttpMethod';
import { Button } from '@/components/ui/button';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import { FormEvent, useState } from 'react';

export interface UrlParams {
	onSend: () => Promise<void> | void;
	method: HttpMethods;
	url: string;
	setMethod: (method: HttpMethods) => void;
	setUrl: (url: string) => void;
}

export default function FormUrl({ onSend, method, url, setMethod, setUrl }: UrlParams) {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const CopyUrl = () => {
		navigator.clipboard.writeText(url);
		setIsClicked(true);

		setTimeout(() => {
			setIsClicked(false);
		}, 500);
	};

	const Send = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSend();
	};

	return (
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
						onChange={(e) => setUrl(e.target.value)}
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
	);
}
