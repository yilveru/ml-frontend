import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface Props {
  products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No tienes productos registrados.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">SKU</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Precio</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
            <tr key={product.id} className="border-t">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{product.sku}</td>
                <td className="border border-gray-300 p-2 text-center">{product.quantity}</td>
                <td className="border border-gray-300 p-2 text-right">${product.price}</td>
            </tr>
            ))}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
