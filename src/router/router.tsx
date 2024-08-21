import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../src/pages/Home/HomePage';
import PokemonDetail from '../features/pokemons/PokemonDetail';

// Створюємо маршрути
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/pokemon/:name',
        element: <PokemonDetail />,
    },
]);

export { router };