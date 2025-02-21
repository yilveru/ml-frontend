import { useState, useEffect } from 'react';
import RegisterModal from '../features/auth/RegisterModal';
import LoginModal from '../features/auth/LoginModal';
import ProductTable from '../components/ProductTable';
import Pagination from '../components/Pagination';

const LoginPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setShowLoginModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    sku: '',
    minPrice: '',
    maxPrice: '',
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    const queryParams = new URLSearchParams();

    if (filters.name) queryParams.append('name', filters.name);
    if (filters.sku) queryParams.append('sku', filters.sku);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());

    try {
      const response = await fetch(`${API_URL}/products/list?${queryParams.toString()}`);
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

 
  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);
  const handleInputChange = (e: any) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between">
        <button onClick={() => setShowLoginModal(true)}>Login</button>
        <button onClick={() => setShowModal(true)}>Registrarse</button>
        {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
        {loginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      </div>
      <div className="index-products">
        <h1 className="text-2xl font-bold mb-4">Buscar Productos</h1>
        <form onSubmit={handleSearch} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="sku"
            value={filters.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Precio mínimo"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Precio máximo"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
            Buscar
          </button>
        </form>
        <ProductTable products={products} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default LoginPage