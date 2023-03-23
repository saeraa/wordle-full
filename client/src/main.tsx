import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Game from './routes/Game';
import Information from './routes/Information';
import Welcome from './routes/Welcome';
import Error404 from './components/Error404';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "game",
        element: <Game />
      },
      {
        path: "information",
        element: <Information />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
