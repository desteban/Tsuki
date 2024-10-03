import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';
import { editor } from 'monaco-editor';
import { Button } from '@/components/ui/button';
import { DefaultBody } from './Items';

interface BodyJsonProps {
	body: DefaultBody;
	setBody: (body: DefaultBody) => void;
}

export default function BodyJson({ body, setBody }: BodyJsonProps) {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const formatEditor = () => {
		editorRef.current?.getAction('editor.action.formatDocument')?.run();
	};

	const changeJson = (value: string | undefined) => {
		if (value === undefined) {
			return;
		}

		const data = value;
		setBody({ ...body, json: data });
	};

	return (
		<div
			id="json"
			aria-label="json of body"
		>
			<div className="my-3">
				<Button onClick={formatEditor}>Format</Button>
			</div>

			<Editor
				className="h-full min-h-72"
				defaultLanguage="json"
				onChange={changeJson}
				onMount={(editor) => {
					editorRef.current = editor;
				}}
				value={body.json || undefined}
			/>
		</div>
	);
}
