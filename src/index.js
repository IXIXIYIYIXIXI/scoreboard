import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import MainMenu from './components/MainMenu/MainMenu';
import LobbySelect from './components/LobbySelect/LobbySelect';
import Lobby from './components/Lobby/Lobby';
import Game from './components/Game/Game';
import Settings from './components/Settings/Settings';

const router = createHashRouter([
  {
    path: '/',
    element: <MainMenu />
  },
  {
    path: '/lobbies',
    element: <LobbySelect />
  },
  {
    path: '/lobby',
    element: <Lobby />
  },
  {
    path: '/play',
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
