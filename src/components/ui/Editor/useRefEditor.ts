import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { customThemesEditor } from './ThemesEditor';

export function useRefEditor() {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
		customThemesEditor.forEach((item) => {
			editor.defineTheme(item.name, item.theme)
		})
	}, [])

	const formatEditor = () => {
		editorRef.current?.getAction('editor.action.formatDocument')?.run();
	};

	return {
		editorRef,
		formatEditor,
	};
}
