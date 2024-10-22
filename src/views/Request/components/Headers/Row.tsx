import { ChangeEvent, useRef } from 'react';
import { ItemHeader } from './ItemHeader';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@/assets/Icons/TrashIcon';

interface PropsRowHeaders {
	header: ItemHeader;
	changeKey: (value: string) => void;
	changeParam: (value: string) => void;
	deleteParam: () => void;
	changeActive: () => void;
}

export default function Row({ header, changeActive, changeKey, changeParam, deleteParam }: PropsRowHeaders) {
	const inputRef = useRef<HTMLInputElement>(null);
	const valueRef = useRef<HTMLInputElement>(null);

	const handleKey = (e: ChangeEvent<HTMLInputElement>) => {
		changeKey(e.currentTarget.value);
		inputRef.current?.focus();
	};

	const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
		changeParam(e.currentTarget.value);
		valueRef.current?.focus();
	};

	return (
		<tr className="group p-1 focus-within:bg-accent hover:bg-haiti-50 dark:bg-opacity-70 dark:focus-within:bg-secondary dark:hover:bg-secondary">
			<td>
				<label className="flex cursor-pointer items-center justify-center">
					<input
						className="size-4"
						type="checkbox"
						aria-label="active param"
						onChange={changeActive}
						checked={header.isActive}
					/>
				</label>
			</td>

			<td width={'50%'}>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="key"
					value={header.key}
					ref={inputRef}
					onChange={handleKey}
				/>
			</td>

			<td width={'50%'}>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="value"
					value={header.value}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>

			<td
				className="flex items-center justify-center"
				width={45}
			>
				{header.allowDelete === false || (
					<button
						onClick={deleteParam}
						aria-label="delete param"
						className="rounded-full p-1 text-primary transition duration-200 hover:bg-primary hover:bg-opacity-50 hover:text-mercury-100"
					>
						<TrashIcon className="size-6" />
					</button>
				)}
			</td>
		</tr>
	);
}
