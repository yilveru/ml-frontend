import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCreateModal from '../features/products/CreateModal';
import ProductTable from '../components/ProductTable';
import LogoutButton from '../components/LogoutButton';
import Pagination from '../components/Pagination';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const queryParams = new URLSearchParams();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());
    const response = await fetch(`http://localhost:3000/products/user?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [navigate, page, limit]);
  const totalPages = Math.ceil(total / limit);
  const handleProductCreated = () => {
    setShowCreateModal(false);
    fetchProducts();
    setSuccessMessage("¡Producto creado correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="home-products">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <button 
        onClick={() => setShowCreateModal(true)} 
        className="bg-red-500 px-4 py-2 rounded mb-4"
      >
        Crear Producto
      </button>
      <LogoutButton />
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      {showCreateModal && <ProductCreateModal 
        onClose={() => setShowCreateModal(false)} 
        onProductCreated={handleProductCreated} 
      />}
      <ProductTable products={products} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default HomePage;
