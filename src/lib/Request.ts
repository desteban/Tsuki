interface RequestProps {
	url: string;
	headers?: HeadersInit;
	signal?: AbortController;
}

export async function Request({ url, headers, signal }: RequestProps) {

}
