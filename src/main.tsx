import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Request from './views/Request/Request';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ResizablePanelGroup
			direction="horizontal"
			className="!h-svh"
		>
			<ResizablePanel
				className="min-w-60 max-w-96 p-3"
				defaultSize={20}
			>
				<h2 className="text-xl">Request history</h2>
			</ResizablePanel>

			<ResizableHandle
				className="border border-japan-300"
				aria-label="resizable bar"
			/>

			<ResizablePanel className="">
				{/* <div className="h-svh w-full bg-red-600"></div> */}
				<Request />
			</ResizablePanel>
		</ResizablePanelGroup>
	</React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
	console.log(message);
});
