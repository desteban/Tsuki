import { Row } from './Row';
import { ItemParams } from './ItemParams';

interface TableParamsProp {
	params: ItemParams[];
	deleteParam: (index: number) => void;
	handleParam: (index: number, key: 'key' | 'value', value: string) => void;
	handleActive: (index: number) => void;
}

export default function TableParams({ deleteParam, params, handleParam, handleActive }: TableParamsProp) {
	return (
		<table
			className="w-full border-separate border-spacing-1"
			aria-label="params request"
		>
			<thead>
				<tr className="font-semibold">
					<td>Active</td>
					<td>Key</td>
					<td>Value</td>
					<td></td>
				</tr>
			</thead>

			<tbody>
				{params.map(({ key, value, active }, index) => (
					<Row
						key={index}
						keyParam={key}
						valueParam={value}
						isActive={active}
						deleteParam={() => deleteParam(index)}
						changeKey={(valueInput) => {
							handleParam(index, 'key', valueInput);
						}}
						changeParam={(valueInput) => {
							handleParam(index, 'value', valueInput);
						}}
						changeActive={() => handleActive(index)}
					/>
				))}
			</tbody>
		</table>
	);
}
