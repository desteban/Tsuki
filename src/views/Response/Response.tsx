import { Editor } from '@/components/ui/Editor';
import { Suspense, useEffect, useState } from 'react';

async function getJsonToResponse(response: Response) {
	try {
		const json = await response.json();
		return json;
	} catch (error) {
		return null;
	}
}

export default function Response({ res }: { res: Response }) {
	const [jsonFromResponse, setJsonFromResponse] = useState<object | null>(null);

	useEffect(() => {
		getJsonToResponse(res)
			.then((json) => setJsonFromResponse(json))
			.catch((err) => console.error('fail:', err));
	}, [res]);

	const RenderJson = () => (
		<Suspense fallback={'Cargando...'}>
			<div className="flex h-full w-full flex-col bg-secondary p-3">
				<h1>Response</h1>
				<div className="h-full">
					<Editor
						className="h-full w-full"
						value={JSON.stringify(jsonFromResponse, null, 2) || undefined}
					/>
				</div>
			</div>
		</Suspense>
	);

	return (
		<section className="h-full w-full">
			<RenderJson />
		</section>
	);
}
