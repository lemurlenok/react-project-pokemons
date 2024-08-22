import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
    prev: string | null;
    next: string | null;
}

const Pagination: FC<PaginationProps> = ({ prev, next }) => {
    const [query, setQuery] = useSearchParams();

    const handlePageChange = (direction: 'prev' | 'next') => {
        const page = query.get('page') ?? '1';
        let currentPage = parseInt(page, 10);

        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next') {
            currentPage++;
        }

        setQuery({ page: currentPage.toString() });
    };

    return (
        <div>
            <button
                disabled={!prev}
                onClick={() => handlePageChange('prev')}
            >
                Prev
            </button>
            <button
                disabled={!next}
                onClick={() => handlePageChange('next')}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;