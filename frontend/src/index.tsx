import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RightClickMenu from './component/rightClickMenu';
import { RightClickMenuProvider } from './context/rightClickMenu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<RightClickMenuProvider>
		<React.StrictMode>
			<App />
			<RightClickMenu />
		</React.StrictMode>
	</RightClickMenuProvider>
);
