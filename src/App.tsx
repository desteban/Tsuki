import { useState } from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import Request from './views/Request/Request';
import Response from './views/Response/Response';

export default function App() {
	const [res, setRespuesta] = useState<Response | null>(null);

	return (
		<ThemeContextProvider>
			<div className="h-svh max-h-svh">
				<div className="h-1/2">
					<Request setResponse={setRespuesta} />
				</div>
				{res ? (
					<div className="flex h-1/2 overflow-auto">
						<Response res={res} />
					</div>
				) : null}
			</div>
		</ThemeContextProvider>
	);
}
