import { Editor } from '@/components/ui/Editor';
import { Suspense, useEffect, useState } from 'react';
import HeaderResponse from './components/HeaderResponse';
import { DataResponse } from '@/lib/RequestUrl';

async function getJsonToResponse(response: Response) {
	try {
		const clone = response.clone();
		const json = await clone.json();
		return json;
	} catch (error) {
		return null;
	}
}

export default function Response({ dataResponse: { response, size, time } }: { dataResponse: DataResponse }) {
	const [jsonFromResponse, setJsonFromResponse] = useState<object | null>(null);

	useEffect(() => {
		getJsonToResponse(response)
			.then((json) => setJsonFromResponse(json))
			.catch((err) => console.error('fail:', err));
	}, [response]);

	const RenderJson = () => (
		<Suspense fallback={'Cargando...'}>
			<div className="h-full">
				<Editor
					readOnly
					className=""
					value={JSON.stringify(jsonFromResponse, null, 2) || undefined}
				/>
			</div>
		</Suspense>
	);

	return (
		<section className="flex h-full w-full flex-col">
			<HeaderResponse
				code={response.status}
				size={size}
				time={time}
			/>
			<RenderJson />
		</section>
	);
}
