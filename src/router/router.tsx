import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../src/components/Home/Home';
import MainLayout from '../layouts/MainLayout';
import Pokemons from "../pages/Pokemons";
import Pokemon from "../pages/Pokemon";
import SearchPage from "../pages/SearchPage";
import Favourite from "../pages/Favourite";

// Створюємо маршрути
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <h1>Error 404</h1>,
        children: [
            {index: true, element: <Home/>},
            {path: 'pokemons', element: <Pokemons/>},
            {path: 'pokemons/:id', element: <Pokemon/>},
            {path: 'search', element: <SearchPage/>},
            {path: 'favourite', element: <Favourite/>}
        ]

    }
])