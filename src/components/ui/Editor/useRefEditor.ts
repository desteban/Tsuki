import { editor } from 'monaco-editor';
import { useRef } from 'react';

export function useRefEditor() {
	return useRef<editor.IStandaloneCodeEditor | null>(null);
}
