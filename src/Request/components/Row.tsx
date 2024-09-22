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
	changeKey,
	changeParam,
	valueParam,
	deleteParam,
	changeActive,
	isActive,
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
		<tr className="group p-1 focus-within:bg-accent hover:bg-accent">
			<td>
				<div className="flex items-center justify-center">
					<input
						type="checkbox"
						aria-label="active param"
						onChange={changeActive}
						checked={isActive}
					/>
				</div>
			</td>

			<td className={''}>
				<Input
					className={`group group-focus:bg-accent`}
					placeholder="key"
					value={keyParam}
					ref={inputRef}
					onChange={handleKey}
				/>
			</td>

			<td>
				<Input
					className={`group group-focus:bg-accent`}
					placeholder="value"
					value={valueParam}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>

			<td>
				<div className="flex items-center justify-center">
					<button
						onClick={deleteParam}
						aria-label="delete param"
					>
						<TrashIcon />
					</button>
				</div>
			</td>
		</tr>
	);
}
