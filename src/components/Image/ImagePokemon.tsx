import React, { FC, useEffect, useState } from 'react';
import { PokemonServices } from '../../services/api.services';

interface IProps {
    url: string;
}

const PokemonImage: FC<IProps> = ({ url }) => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];

        // Функція для отримання зображення асинхронно
        const fetchImage = async () => {
            try {
                const pokemonImage = await PokemonServices.getImage(id);
                setImage(pokemonImage);
            } catch (error) {
                console.error('Failed to fetch Pokémon image:', error);
                setImage(null);
            }
        };

        fetchImage();
    }, [url]);

    return (
        <div>
            {image ? (
                <img src={image} alt="pokemon" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PokemonImage;