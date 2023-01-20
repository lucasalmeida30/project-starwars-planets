import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TableProvider from './context/TableProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <TableProvider>
      <App />
    </TableProvider>,
  );
