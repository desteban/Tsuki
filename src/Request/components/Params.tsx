import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef } from 'react';

export type ItemParams = {
	key: string;
	value: string;
};

export interface Props {
	params: ItemParams[];
	setParams: (params: ItemParams[]) => void;
}

const stylesTd = 'group p-1 hover:bg-slate-50 group-hover:bg-gray-100';
const stylesInput = 'bg-transparent focus:bg-slate-200';

interface PropsRow {
	keyParam: string;
	changeKey: (value: string) => void;
	valueParam: string;
	changeParam: (value: string) => void;
}
const Row = ({ keyParam, changeKey: changeKey, changeParam, valueParam }: PropsRow) => {
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
		<tr>
			<td className={stylesTd}>
				<Input
					className={`${stylesInput} !group-focus:bg-red-600 group`}
					placeholder="key"
					value={keyParam}
					ref={inputRef}
					onChange={handleKey}
				/>
			</td>

			<td>
				<Input
					className={`${stylesInput} !group-focus:bg-red-600 group`}
					placeholder="value"
					value={valueParam}
					ref={valueRef}
					onChange={handleValue}
				/>
			</td>
		</tr>
	);
};

export default function Params({ params, setParams }: Props) {
	const handleParam = (index: number, key: 'key' | 'value', value: string) => {
		const newParams = [...params];
		newParams[index] = { ...newParams[index], [key]: value };
		setParams(newParams);
	};

	const TableBody = () => (
		<>
			{params.map(({ key, value }, index) => (
				<Row
					key={index}
					keyParam={key}
					valueParam={value}
					changeKey={(valueInput) => {
						handleParam(index, 'key', valueInput);
					}}
					changeParam={(valueInput) => {
						handleParam(index, 'value', valueInput);
					}}
				/>
			))}
		</>
	);

	return (
		<div>
			<h2>Query Parameters</h2>
			<p>Add or edit your params for the request</p>

			<button
				className="rounded-md border px-2 py-1"
				onClick={() => {
					setParams([...params, { key: 'new key', value: 'the value of key' }]);
				}}
			>
				Agregar
			</button>

			<pre>
				<code>{JSON.stringify(params, null, 2)}</code>
			</pre>

			<section aria-label="params request">
				<table
					className="table w-full table-auto"
					aria-label="params request"
				>
					<thead>
						<tr className="font-semibold">
							<td>Key</td>
							<td>Value</td>
						</tr>
					</thead>

					<tbody>
						<TableBody />
					</tbody>
				</table>
			</section>
		</div>
	);
}
