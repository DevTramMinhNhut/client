import ReactDOM from 'react-dom/client';
import '../src/styles/global.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
const React = require("react")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
