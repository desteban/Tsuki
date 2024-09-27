import { ItemHeader } from '@/views/Request/components/Headers/ItemHeader';

export function FormatterHeadersInit(list: ItemHeader[]): HeadersInit {
	const headers: HeadersInit = {};

	list.forEach(({ isActive, key, value }) => {
		if (isActive && key.length !== 0 && value.length !== 0) {
			headers[key] = value;
		}
	});

	return headers;
}
