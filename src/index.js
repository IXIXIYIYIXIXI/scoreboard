import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import MainMenu from './components/MainMenu/MainMenu';
import Lobby from './components/Lobby/Lobby';
import Game from './components/Game/Game';
import Settings from './components/Settings/Settings';

const router = createBrowserRouter([
  {
    path: '/scoreboard',
    element: <MainMenu />
  },
  {
    path: '/scoreboard/lobby',
    element: <Lobby />
  },
  {
    path: '/scoreboard/game',
    element: <Game />
  },
  {
    path: '/scoreboard/settings',
    element: <Settings />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
