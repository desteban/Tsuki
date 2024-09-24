export type ItemHeader = {
	key: string;
	value: string;
	active: boolean;
};

export const headersDefault: ItemHeader[] = [
	{ active: true, key: 'Accept', value: '*/*' },
	{ active: true, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
	{ active: true, key: 'User-Agent', value: 'Tsuki' },
];