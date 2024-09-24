import { TrashIcon } from '@/assets/Icons/TrashIcon';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef } from 'react';

export interface PropsRow {
	keyParam: string;
	valueParam: string;
	isActive: boolean;
	changeKey: (value: string) => void;
	changeParam: (value: string) => void;
	deleteParam: () => void;
	changeActive: () => void;
}
export function Row({
	keyParam,
	valueParam,
	isActive,
	changeKey,
	changeParam,
	deleteParam,
	changeActive,
}: PropsRow) {
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
		<tr className="group p-1 focus-within:bg-accent hover:bg-haiti-50">
			<td>
				<label className="flex cursor-pointer items-center justify-center">
					<input
						className="size-4"
						type="checkbox"
						aria-label="active param"
						onChange={changeActive}
						checked={isActive}
					/>
				</label>
			</td>

			<td className={''}>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="key"
					value={keyParam}
					ref={inputRef}
					onChange={handleKey}
				/>
			</td>

			<td>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="value"
					value={valueParam}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>

			<td className="flex items-center justify-center">
				<button
					onClick={deleteParam}
					aria-label="delete param"
					className="rounded-full p-1 text-primary transition duration-200 hover:bg-primary hover:bg-opacity-50 hover:text-mercury-100"
				>
					<TrashIcon className="size-6" />
				</button>
			</td>
		</tr>
	);
}
