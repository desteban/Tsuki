export type ItemHeader = {
	key: string;
	value: string;
	isActive: boolean;
};

export const headersDefault: ItemHeader[] = [
	{ isActive: true, key: 'Accept', value: '*/*' },
	{ isActive: true, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
	{ isActive: true, key: 'User-Agent', value: 'Tsuki' },
];
