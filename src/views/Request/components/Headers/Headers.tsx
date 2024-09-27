import { ItemHeader } from './ItemHeader';
import TableHeaders from './TableHeaders';

export interface HeadersProps {
	headers: ItemHeader[];
	setHeaders(headers: ItemHeader[]): void;
}

export default function Headers({ headers, setHeaders }: HeadersProps) {
	const handleHeader = (
		index: number,
		key: 'key' | 'value' | 'active',
		value: string | boolean,
	) => {
		const newHeaders = [...headers];
		newHeaders[index] = { ...newHeaders[index], [key]: value };

		//buscar si se escribe en el ultimo campo
		if (index === headers.length - 1) {
			newHeaders[index].isActive = true;
			setHeaders([...newHeaders, { isActive: false, key: '', value: '' }]);
		} else setHeaders(newHeaders);
	};

	const deleteHeader = (indexDelete: number) => {
		const newHeaders = headers.filter((_, index) => index !== indexDelete);
		setHeaders(newHeaders);
	};

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
