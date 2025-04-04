import { Editor as EditorMonaco } from '@monaco-editor/react';
import { ThemesEditor } from '@/components/ui/Editor/ThemesEditor';
import { LanguageEditor } from './LanguageEditor';
import { MutableRefObject, useContext } from 'react';
import { editor } from 'monaco-editor';
import { ThemeContext, ThemesApp } from '@/context/ThemeContext';

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
	value,
	theme,
}: PropsEditor) {
	let themeEditor: ThemesEditor | undefined = theme

	if(!themeEditor){
		const { theme: themeApp } = useContext(ThemeContext)
		themeEditor = themeApp === ThemesApp.dark ? ThemesEditor.dark : ThemesEditor.light
	}

	return (
		<EditorMonaco
			options={{ readOnly }}
			className={className}
			defaultLanguage={LanguageEditor.json}
			theme={themeEditor}
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
