import { ItemParams } from './ItemParams';
import TableParams from './TableParams';

export interface ParamsProps {
	params: ItemParams[];
	url: string;
	setParams: (params: ItemParams[]) => void;
	setUrl: (url: string) => void;
}

export default function Params({ params, url, setParams, setUrl }: ParamsProps) {
	const changeUrl = (newParams: ItemParams[]) => {
		const paramsUrl: URLSearchParams = new URLSearchParams();
		newParams.map(({ key, value, active }) => {
			if (active) {
				paramsUrl.append(key, value);
			}
		});

		let newUrl: string = url;
		if (url.includes('?')) {
			newUrl = url.substring(0, url.indexOf('?'));
		}

		setUrl(`${newUrl}${paramsUrl.size !== 0 ? '?' + paramsUrl.toString() : ''}`);
	};

	const handleParam = (index: number, key: 'key' | 'value', value: string) => {
		const newParams: ItemParams[] = [...params];
		newParams[index][key] = value;

		if (index === params.length - 1) {
			newParams[index].active = true;
			newParams.push({ active: false, key: '', value: '' });
		}

		setParams(newParams);
		changeUrl(newParams);
	};

	const deleteParam = (indexDelete: number) => {
		let newParams: ItemParams[] = [];

		if (indexDelete === params.length - 1) {
			newParams = [{ active: false, key: '', value: '' }];
		}

		if (indexDelete !== params.length - 1) {
			newParams = params.filter((_, index) => index !== indexDelete);
		}

		setParams(newParams);
		changeUrl(newParams);
	};

	const handleActive = (index: number) => {
		const newParams = [...params];
		newParams[index].active = !newParams[index].active;
		setParams(newParams);
		changeUrl(newParams);
	};

	return (
		<div>
			<h2>Query Parameters</h2>
			<p>Add or edit your params for the request</p>

			<section aria-label="params request">
				<TableParams
					deleteParam={deleteParam}
					handleActive={handleActive}
					handleParam={handleParam}
					params={params}
				/>
			</section>
		</div>
	);
}
