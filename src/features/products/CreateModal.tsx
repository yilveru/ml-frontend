import { useState } from 'react';

interface Props {
  onClose: () => void;
  onProductCreated: () => void;
}

const ProductCreateModal: React.FC<Props> = ({ onClose, onProductCreated  }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/products/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          name, 
          sku, 
          quantity: parseInt(quantity, 10), 
          price: parseFloat(price) }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      setError('');
      setName('');
      setSku('');
      setQuantity('');
      setPrice('');
      onProductCreated();

    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Crear producto</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 rounded hover:bg-green-600"
          >
            Guardar
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full p-2 mt-4 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductCreateModal;
