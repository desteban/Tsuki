import { Button } from '@/components/ui/button';
import { ItemParams } from './ItemParams';
import TableParams from './TableParams';

export interface Props {
	params: ItemParams[];
	url: string;
	setParams: (params: ItemParams[]) => void;
	setUrl: (url: string) => void;
}

export default function Params({ params, url, setParams, setUrl }: Props) {
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

		// console.log(`${newUrl}${paramsUrl.size !== 0 ? '?' + paramsUrl.toString() : ''}`);
		setUrl(`${newUrl}${paramsUrl.size !== 0 ? '?' + paramsUrl.toString() : ''}`);
	};

	const handleParam = (index: number, key: 'key' | 'value' | 'active', value: string | boolean) => {
		const newParams = [...params];
		newParams[index] = { ...newParams[index], [key]: value };
		setParams(newParams);
		changeUrl(newParams);
	};

	const deleteParam = (indexDelete: number) => {
		const newParams = params.filter((_, index) => index !== indexDelete);
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

				<Button
					className="w-full"
					variant={'outline'}
					onClick={() => {
						setParams([...params, { key: '', value: '', active: true }]);
					}}
				>
					Add Param
				</Button>
			</section>
		</div>
	);
}
