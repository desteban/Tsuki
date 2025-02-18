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
	const [htmlFromResponse, setHtmlFromResponse] = useState<string | null>(null);

	useEffect(() => {
		ClearState();

		if (responseIsJson()) {
			getJsonToResponse(response)
				.then((json) => setJsonFromResponse(json))
				.catch((err) => console.error('fail:', err));
		}

		if (responseIsHtml()) {
			response
				.text()
				.then((html) => setHtmlFromResponse(html))
				.finally(() => console.log('end'));
		}
	}, [response]);

	const responseIsJson = () => response.headers.get('content-type')?.includes('application/json');
	const responseIsHtml = () => response.headers.get('content-type')?.includes('text/html');

	const ClearState = () => {
		setJsonFromResponse(null);
		setHtmlFromResponse(null);
	};

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

	const ShowHtml = () => {
		return (
			<div className="bg-gray-200 px-3 py-2">
				<div dangerouslySetInnerHTML={{ __html: htmlFromResponse ?? '' }} />
			</div>
		);
	};

	const ShowResponse = () => {
		if (responseIsJson()) {
			return <RenderJson />;
		}

		if (responseIsHtml()) {
			return <ShowHtml />;
		}

		return null;
	};

	return (
		<section className="flex h-full w-full flex-col">
			<HeaderResponse
				code={response.status}
				size={size}
				time={time}
			/>

			<ShowResponse />
		</section>
	);
}
