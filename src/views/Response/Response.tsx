import { ThemesEditor } from '@/lib/Types/ThemesEditor';
import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { Suspense, useEffect, useRef, useState } from 'react';

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
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
		getJsonToResponse(res)
			.then((json) => setJsonFromResponse(json))
			.catch((err) => console.error('fail:', err));
	}, [res]);

	const RenderJson = () => (
		<Suspense fallback={'Cargando...'}>
			<div className="flex h-full w-full flex-col bg-secondary p-3">
				<h1>Respuesta json</h1>
				<div className="h-full">
					<Editor
						value={JSON.stringify(jsonFromResponse, null, 2) || undefined}
						theme={ThemesEditor.dark}
						className="h-full w-full"
						defaultLanguage="json"
						onMount={(editor) => {
							editorRef.current = editor;
						}}
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
