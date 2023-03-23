import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'



ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);


// https://react.dev/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react
// import { hydrateRoot } from 'react-dom/client';
// import App from './App.js';

// hydrateRoot(
//   document.getElementById('root'),
//   <App />
// );