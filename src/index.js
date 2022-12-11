import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import MainMenu from './components/MainMenu/MainMenu';
import Lobby from './components/Lobby/Lobby';
import Game from './components/Game/Game';
import Settings from './components/Settings/Settings';

const router = createHashRouter([
  {
    path: '/',
    element: <MainMenu />
  },
  {
    path: '/lobby',
    element: <Lobby />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/settings',
    element: <Settings />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
