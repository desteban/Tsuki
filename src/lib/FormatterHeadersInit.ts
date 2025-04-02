import { ItemHeader } from '@/views/Request/components/Headers/ItemHeader';

export function FormatterHeadersInit(list: ItemHeader[]): Headers {
	const headers = new Headers();

	list.forEach(({ isActive, key, value }) => {
		if (isActive && key.length !== 0 && value.length !== 0) {
			headers.append(key, value)
		}
	});

	return headers;
}
