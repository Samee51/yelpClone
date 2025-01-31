import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root'); // Matches the `id` in index.html

if (!rootElement) {
    throw new Error('Root container not found. Ensure your index.html has a <div id="root"></div>.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
