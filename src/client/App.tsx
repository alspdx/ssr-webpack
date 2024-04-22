import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, useMatch } from 'react-router-dom';

import { routes } from 'routes';

import './reset.css';

const router = createBrowserRouter(
  createRoutesFromElements(routes)
);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
