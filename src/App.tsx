import { useState } from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import Request from './views/Request/Request';
import Response from './views/Response/Response';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';

export default function App() {
	const [res, setRespuesta] = useState<Response | null>(null);

	const ShowResponse = () => {
		if (!res || res === null) {
			return null;
		}

		return (
			<>
				<ResizableHandle
					withHandle
					className="dark:text-primary"
				/>

				<ResizablePanel
					defaultSize={50}
					className="h-svh min-w-[30%]"
				>
					<section className="h-svh py-3 px-2">{res ? <Response response={res} /> : null}</section>
				</ResizablePanel>
			</>
		);
	};

	return (
		<ThemeContextProvider>
			<main>
				<ResizablePanelGroup
					direction="horizontal"
					className="h-svh max-h-svh"
				>
					<ResizablePanel
						defaultSize={50}
						className="min-w-[30%]"
					>
						<section className="h-svh py-3 px-2">
							<Request setResponse={setRespuesta} />
						</section>
					</ResizablePanel>

					<ShowResponse />
				</ResizablePanelGroup>
			</main>
		</ThemeContextProvider>
	);
}
