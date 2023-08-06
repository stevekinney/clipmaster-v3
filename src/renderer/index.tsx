import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Application from './components/application';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Application />);
