import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Pokemon Detail for ID: {id}</h1>
            {/* Додайте ваш контент для деталей покемона тут */}
        </div>
    );
};

export default PokemonDetail;