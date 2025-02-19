import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-2 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {page} de {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-300 rounded mx-2 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
