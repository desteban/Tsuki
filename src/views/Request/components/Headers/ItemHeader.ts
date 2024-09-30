export type ItemHeader = {
	key: string;
	value: string;
	isActive: boolean;
	allowDelete: boolean;
};

export const headersDefault: ItemHeader[] = [
	{ isActive: true, key: 'Accept', value: '*/*', allowDelete: false },
	// { isActive: true, key: 'Accept-Encoding', value: 'gzip, deflate, br', allowDelete: false },
	{ isActive: true, key: 'User-Agent', value: 'Tsuki', allowDelete: false },
];
