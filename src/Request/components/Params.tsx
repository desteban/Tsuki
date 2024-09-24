import { Button } from '@/components/ui/button';
import { Row } from './Row';

export type ItemParams = {
	key: string;
	value: string;
	active: boolean;
};

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
				<table
					className="w-full border-separate border-spacing-1"
					aria-label="params request"
				>
					<thead>
						<tr className="font-semibold">
							<td>Active</td>
							<td>Key</td>
							<td>Value</td>
						</tr>
					</thead>

					<tbody>
						{params.map(({ key, value, active }, index) => (
							<Row
								key={index}
								keyParam={key}
								valueParam={value}
								isActive={active}
								deleteParam={() => deleteParam(index)}
								changeKey={(valueInput) => {
									handleParam(index, 'key', valueInput);
								}}
								changeParam={(valueInput) => {
									handleParam(index, 'value', valueInput);
								}}
								changeActive={() => handleActive(index)}
							/>
						))}
					</tbody>
				</table>

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
