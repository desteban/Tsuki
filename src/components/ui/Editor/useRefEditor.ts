import { editor } from 'monaco-editor';
import { useRef } from 'react';

export function useRefEditor() {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const formatEditor = () => {
		editorRef.current?.getAction('editor.action.formatDocument')?.run();
	};

	return {
		editorRef,
		formatEditor,
	};
}
