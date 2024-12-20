import styles from '../Styles.module.css';
import { Check, Copy, SendHorizontalIcon, SunMoon, X } from 'lucide-react';
import SelectHttpMethod from './SelectHttpMethod';
import { Button } from '@/components/ui/button';
import { HttpMethods } from '@/lib/Types/HttpMethods';
import { FormEvent, useContext, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export interface UrlParams {
	method: HttpMethods;
	url: string;
	load: boolean;
	onSend: () => Promise<void> | void;
	setMethod: (method: HttpMethods) => void;
	setUrl: (url: string) => void;
	onCancelled(): void;
}

export default function FormUrl({ onSend, method, url, setMethod, setUrl, load, onCancelled }: UrlParams) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const { changeTheme } = useContext(ThemeContext);

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
						name="select method http"
					/>
				</div>
				<div className="flex w-full">
					<input
						className="w-full rounded-l-md border border-haiti-800 px-3 py-1 focus:outline-haiti-900 dark:border-2 dark:bg-secondary dark:text-white dark:placeholder:text-slate-300"
						value={url}
						placeholder="http://localhost:8000"
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button
						className="flex items-center justify-center rounded-r-md border border-l-0 border-haiti-800 bg-[#e5e0eb] bg-accent px-2 py-1 dark:border-2 dark:bg-secondary dark:text-primary-foreground"
						onClick={CopyUrl}
						type="button"
						name="copy-url"
						aria-label="copy url"
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
								className="stroke-mercury-950 dark:stroke-white"
							/>
						)}
					</button>
				</div>

				{load ? (
					<Button
						variant={'destructive'}
						className={'flex items-center gap-2'}
						type="button"
						onClick={(e) => {
							e.preventDefault();
							onCancelled();
						}}
					>
						Cancel <X className="size-4" />
					</Button>
				) : (
					<Button
						type="submit"
						className={'flex items-center gap-2'}
					>
						Send <SendHorizontalIcon className="size-4" />
					</Button>
				)}

				<button
					type="button"
					onClick={changeTheme}
					className="pl-2 pr-1"
					aria-label="change theme"
					title="change theme"
				>
					<SunMoon size={'2rem'} />
				</button>
			</form>
		</section>
	);
}
