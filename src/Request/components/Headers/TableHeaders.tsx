import { ItemHeader } from "./ItemHeader";
import Row from "./Row";

interface TableHeadersProps {
    headers: ItemHeader[]
	deleteHeader: (index: number) => void;
	handleHeader: (index: number, key: 'key' | 'value' | 'active', value: string) => void;
	handleActive: (index: number) => void;
}

export default function TableHeaders({ headers, deleteHeader, handleActive, handleHeader }: TableHeadersProps) {
  return (
			<table
				className="w-full border-separate border-spacing-1"
				aria-label="headers request"
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
					{headers.map((header, index) => (
						<Row
							key={index}
							header={header}
							deleteParam={() => deleteHeader(index)}
							changeKey={(valueInput) => {
								handleHeader(index, 'key', valueInput);
							}}
							changeParam={(valueInput) => {
								handleHeader(index, 'value', valueInput);
							}}
							changeActive={() => handleActive(index)}
						/>
					))}
				</tbody>
			</table>
  )
}
