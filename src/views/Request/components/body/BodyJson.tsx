import { Button } from '@/components/ui/button';
import { DefaultBody } from './Items';
import { FileJson2 } from 'lucide-react';
import { Editor, useRefEditor } from '@/components/ui/Editor';

interface BodyJsonProps {
	body: DefaultBody;
	setBody: (body: DefaultBody) => void;
}

export default function BodyJson({ body, setBody }: BodyJsonProps) {
	const { editorRef, formatEditor } = useRefEditor();

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
					variant="outline"
					onClick={formatEditor}
					className="items-center gap-1 px-2 py-1 font-normal transition duration-200 hover:bg-purple-600 hover:text-white"
				>
					Format
					<FileJson2
						className="size-5"
						strokeWidth={1.5}
					/>
				</Button>
			</div>

			<Editor
				className="min-h-80"
				onChange={changeJson}
				refEditor={editorRef}
				value={body.json || undefined}
			/>
		</div>
	);
}
