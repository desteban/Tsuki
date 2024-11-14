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
				<ResizableHandle />

				<ResizablePanel defaultSize={50} className='min-w-[30%]'>
					<section className="h-full bg-secondary p-3">
						<h2>Response</h2>
						{res ? <Response res={res} /> : null}
					</section>
				</ResizablePanel>
			</>
		);
	};

	return (
		<ThemeContextProvider>
			<ResizablePanelGroup
				direction="horizontal"
				className="h-svh max-h-svh"
			>
				<ResizablePanel defaultSize={50} className='min-w-[30%]'>
					<section className="h-svh">
						<Request setResponse={setRespuesta} />
					</section>
				</ResizablePanel>

				<ShowResponse />
			</ResizablePanelGroup>
		</ThemeContextProvider>
	);
}
