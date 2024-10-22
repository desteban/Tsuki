import { useState } from 'react';
import { headersDefault, ItemHeader } from '../components/Headers/ItemHeader';

export type KeysHeaders = 'key' | 'value' | 'active';

export function useHeaders() {
	const [headers, setHeaders] = useState<ItemHeader[]>([
		...headersDefault,
		{ allowDelete: true, isActive: false, key: '', value: '' },
	]);

	const deleteHeader = (indexDelete: number) => {
		if (!headers[indexDelete].allowDelete) {
			return;
		}

		const constHeaders = headers.filter((header) => header.allowDelete === false).length;
		const newHeaders = headers.filter((_, index) => index !== indexDelete);
		if (newHeaders.length <= constHeaders) {
			newHeaders[indexDelete] = { allowDelete: true, isActive: false, key: '', value: '' };
		}

		setHeaders(newHeaders);
	};

	const handleHeader = (index: number, key: KeysHeaders, value: string | boolean) => {
		const newHeaders = [...headers];
		newHeaders[index] = { ...newHeaders[index], [key]: value };

		//buscar si se escribe en el ultimo campo
		if (index === headers.length - 1) {
			newHeaders[index].isActive = true;
			setHeaders([...newHeaders, { isActive: false, key: '', value: '', allowDelete: true }]);
		} else setHeaders(newHeaders);
	};

	return { headers, setHeaders, deleteHeader, handleHeader };
}
