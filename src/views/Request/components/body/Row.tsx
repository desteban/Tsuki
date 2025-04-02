import { ChangeEvent, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@/assets/Icons/TrashIcon';
import { FormEncoded } from '@/models/FormEncoded';
import { MultipartFormData, TypesMultiPartFormData } from '@/models/MultipartFormData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasePropsRowHeaders<T> {
	item: T;
	index: number;
	changeItem: (item: T, index: number) => void;
	deleteItem: (index: number) => void;
	variant: 'encoded' | 'multipart';
}

type PropsRowHeaders =
	| (BasePropsRowHeaders<FormEncoded> & { variant: 'encoded' })
	| (BasePropsRowHeaders<MultipartFormData> & { variant: 'multipart' });

export default function Row({ item, deleteItem, changeItem, index, variant }: PropsRowHeaders) {
	const typeInput = variant === 'multipart' ? item.type : TypesMultiPartFormData.text;
	const inputRef = useRef<HTMLInputElement>(null);
	const valueRef = useRef<HTMLInputElement>(null);

	const handleKey = (e: ChangeEvent<HTMLInputElement>) => {
		if (variant === 'encoded') changeItem({ ...item, key: e.currentTarget.value, active: true }, index);

		if (variant === 'multipart') changeItem({ ...item, key: e.currentTarget.value, active: true }, index);

		inputRef.current?.focus();
	};

	const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
		if (variant === 'encoded') changeItem({ ...item, value: e.currentTarget.value, active: true }, index);

		if (variant === 'multipart') {
			const { value, type, files } = e.target;
			const newItem = { ...item };
			if (newItem.type === TypesMultiPartFormData.file && type === TypesMultiPartFormData.file && files) {
				newItem.value = files[0];
			}

			if (newItem.type === TypesMultiPartFormData.text && type === TypesMultiPartFormData.text) {
				newItem.value = value;
			}
			changeItem(newItem, index);
		}
		valueRef.current?.focus();
	};

	const changeActive = () => {
		if (variant === 'encoded') changeItem({ ...item, active: !item.active }, index);

		if (variant === 'multipart') changeItem({ ...item, active: !item.active }, index);
	};

	const DeleteButton = () => (
		<button
			onClick={() => deleteItem(index)}
			aria-label="delete param"
			className="rounded-full p-1 text-primary transition duration-200 hover:bg-primary hover:bg-opacity-50 hover:text-mercury-100"
		>
			<TrashIcon className="size-6" />
		</button>
	);

	const changeType = (type: TypesMultiPartFormData) => {
		if (variant === 'encoded' || type === item.type) return;

		if (variant === 'multipart') {
			const newItem: MultipartFormData = { ...item };
			newItem.type = type;
			newItem.value = type === TypesMultiPartFormData.text ? '' : null;
			changeItem(newItem, index);
		}
	};

	const ChooseType = () => {
		if (variant === 'encoded') return null;

		if (variant === 'multipart') {
			return (
				<Select
					value={item.type}
					onValueChange={changeType}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={TypesMultiPartFormData.text}>Text</SelectItem>
						<SelectItem value={TypesMultiPartFormData.file}>File</SelectItem>
					</SelectContent>
				</Select>
			);
		}
	};

	return (
		<tr className="row">
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

			<td
				width={'50%'}
				className="col"
			>
				<Input
					className={`group`}
					placeholder="key"
					value={item.key}
					ref={inputRef}
					onChange={handleKey}
				/>

				<ChooseType />
			</td>

			<td width={'50%'}>
				<Input
					type={typeInput}
					className={`group border-[#e5e5e5] group-focus:bg-accent`}
					placeholder="value"
					value={typeInput === 'text' ? (item.value as string) : undefined}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>

			<td
				className="flex items-center justify-center"
				width={45}
			>
				{index === 0 || <DeleteButton />}
			</td>
		</tr>
	);
}
