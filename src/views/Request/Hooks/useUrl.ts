import { useState } from "react";
import { ItemParams } from "../components/Params/ItemParams";

function getParamsFromUrl(url: string): URLSearchParams {
	try {
		const urlParams = new URL(url).searchParams;
		return urlParams;
	} catch (error) {
		const index = url.indexOf('?');
		if (index > -1) {
			const data = url.substring(index + 1);
			return new URL(`http://localhost:8000?${data}`).searchParams;
		}

		return new URLSearchParams();
	}
}


export function useUrl() {
    const [url, setUrl] = useState<string>('');
	const [params, setParams] = useState<ItemParams[]>([{ active: true, key: '', value: '' }]);

    const handleParamsFromUrl = (url: string) => {
		const oldParams = params.filter((param) => param.key.length !== 0 || param.value.length !== 0);
		const paramsUrl = getParamsFromUrl(url);
		const activeParams: { index: number; param: ItemParams }[] = [];
		const newParams: ItemParams[] = [];
		oldParams.map((params, index) => {
			if (!params.active) {
				activeParams.push({ index, param: params });
			}
		});
		paramsUrl.forEach((value, key) => {
			newParams.push({ key, value, active: true });
		});

		activeParams.map(({ index, param }) => {
			newParams.splice(index, 0, param);
		});

		setParams([...newParams, { active: false, key: '', value: '' }]);
		setUrl(url);
	};

    return {url, setUrl, params, setParams, handleParamsFromUrl}
}