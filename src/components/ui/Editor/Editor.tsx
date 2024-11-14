import { Editor as EditorMonaco } from '@monaco-editor/react';
import { ThemesEditor } from '@/components/ui/Editor/ThemesEditor';
import { LanguageEditor } from './LanguageEditor';
import { MutableRefObject } from 'react';
import { editor } from 'monaco-editor';

interface PropsEditor {
	className?: string;
	onChange?: (value: string | undefined) => void;
	theme?: ThemesEditor;
	value?: string | undefined;
	refEditor?: MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

export function Editor({ onChange, value, theme = ThemesEditor.dark, className = '', refEditor }: PropsEditor) {
	return (
		<EditorMonaco
			className={className}
			defaultLanguage={LanguageEditor.json}
			theme={theme}
			onChange={onChange}
			onMount={(editor) => {
				if (refEditor?.current) {
					refEditor.current = editor;
				}
			}}
			value={value}
		/>
	);
}
