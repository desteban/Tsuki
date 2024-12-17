import { Editor as EditorMonaco } from '@monaco-editor/react';
import { ThemesEditor } from '@/components/ui/Editor/ThemesEditor';
import { LanguageEditor } from './LanguageEditor';
import { MutableRefObject } from 'react';
import { editor } from 'monaco-editor';

interface PropsEditor {
	className?: string;
	onChange?: (value: string | undefined) => void;
	readOnly?: boolean;
	refEditor?: MutableRefObject<editor.IStandaloneCodeEditor | null>;
	theme?: ThemesEditor;
	value?: string | undefined;
}

export function Editor({
	className = '',
	onChange,
	readOnly = false,
	refEditor,
	theme = ThemesEditor.dark,
	value,
}: PropsEditor) {
	return (
		<EditorMonaco
			options={{ readOnly }}
			className={className}
			defaultLanguage={LanguageEditor.json}
			theme={theme}
			onChange={onChange}
			onMount={(editor) => {
				if (refEditor !== undefined) {
					refEditor.current = editor;
				}
			}}
			value={value}
		/>
	);
}
