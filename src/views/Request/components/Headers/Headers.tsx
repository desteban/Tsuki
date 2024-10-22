import { KeysHeaders } from '../../Hooks/useHeaders';
import { ItemHeader } from './ItemHeader';
import TableHeaders from './TableHeaders';

export interface HeadersProps {
	headers: ItemHeader[];
	setHeaders(headers: ItemHeader[]): void;
	deleteHeader(index: number): void;
	handleHeader(index: number, key: KeysHeaders, value: string | boolean): void;
}

export default function Headers({ headers, setHeaders, deleteHeader, handleHeader }: HeadersProps) {
	const handleActive = (index: number) => {
		const newHeaders = [...headers];
		newHeaders[index].isActive = !newHeaders[index].isActive;
		setHeaders(newHeaders);
	};

	return (
		<div>
			<h2>Heades</h2>
			<p>Add or edit your headers for the request</p>

			<TableHeaders
				headers={headers}
				deleteHeader={deleteHeader}
				handleActive={handleActive}
				handleHeader={handleHeader}
			/>
		</div>
	);
}
