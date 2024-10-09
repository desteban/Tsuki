import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';
import { editor } from 'monaco-editor';
import { Button } from '@/components/ui/button';
import { DefaultBody } from './Items';
import { FileJson2 } from 'lucide-react';

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
			<div className="float-right my-3">
				<Button
					variant={'ghost'}
					onClick={formatEditor}
					className="items-center gap-1 px-2 py-1 font-normal transition duration-200 hover:bg-purple-600 hover:text-white"
				>
					Format{' '}
					<FileJson2
						className="size-5"
						strokeWidth={1.5}
					/>
				</Button>
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
