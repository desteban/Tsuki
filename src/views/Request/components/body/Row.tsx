import { ChangeEvent, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@/assets/Icons/TrashIcon';
import { FormEncoded } from '@/models/FormEncoded';

interface PropsRowHeaders {
	item: FormEncoded;
	index: number;
	changeItem: (item: FormEncoded, index: number) => void;
	deleteItem: (index: number) => void
}

export default function Row({ item, deleteItem, changeItem, index }: PropsRowHeaders) {
	const inputRef = useRef<HTMLInputElement>(null);
	const valueRef = useRef<HTMLInputElement>(null);

	const handleKey = (e: ChangeEvent<HTMLInputElement>) => {
		changeItem({ ...item, key: e.currentTarget.value, active: true }, index);
		inputRef.current?.focus();
	};

	const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
		changeItem({ ...item, value: e.currentTarget.value, active: true }, index);
		valueRef.current?.focus();
	};

	const changeActive = () => {
		changeItem({ ...item, active: !item.active }, index);
	};

	const DeleteButton = () => (<button
		onClick={() => deleteItem(index)}
		aria-label="delete param"
		className="rounded-full p-1 text-primary transition duration-200 hover:bg-primary hover:bg-opacity-50 hover:text-mercury-100"
	>
		<TrashIcon className="size-6" />
	</button>)

	return (
		<tr className="group p-1 focus-within:bg-accent hover:bg-haiti-50 dark:bg-opacity-70 dark:focus-within:bg-secondary dark:hover:bg-secondary">
			<td>
				<label className="flex cursor-pointer items-center justify-center">
					<input
						className="size-4"
						type="checkbox"
						aria-label="active param"
						onChange={changeActive}
						checked={item.active}
					/>
				</label>
			</td>

			<td width={'50%'}>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="key"
					value={item.key}
					ref={inputRef}
					onChange={handleKey}
				/>
			</td>

			<td width={'50%'}>
				<Input
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="value"
					value={item.value}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>

			<td
				className="flex items-center justify-center"
				width={45}
			>
				{ index === 0 || <DeleteButton /> }
			</td>
		</tr>
	);
}
