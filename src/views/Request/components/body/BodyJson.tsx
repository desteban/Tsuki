import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';
import { editor } from 'monaco-editor';

export default function BodyJson() {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const formatEditor = () => {
		editorRef.current?.getAction('editor.action.formatDocument')?.run();
	};

	return (
		<div
			id="json"
			aria-label="json of body"
		>
			<p>config json</p>

			<button
				onClick={formatEditor}
				className="my-5 rounded-lg bg-white px-2 py-1 shadow-md"
			>
				format
			</button>

			<Editor
				height="40vh"
				defaultLanguage="json"
				onMount={(editor) => {
					editorRef.current = editor;
				}}
			/>
		</div>
	);
}
