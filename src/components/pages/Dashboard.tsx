import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/dashboard.types';
import { getProductsAPI, deleteProductAPI } from '../../utils/queries';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProductsAPI();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await deleteProductAPI(id);
      const updatedProducts = await getProductsAPI();
      setProducts(updatedProducts);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/productos/editar/${id}`);
  };

  const handleAddProduct = () => {
    navigate('/admin/productos/nuevo');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="h-full p-2 sm:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-2 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Panel de Productos</h1>
              <p className="text-sm sm:text-base text-gray-600">Aquí podrás gestionar los productos.</p>
            </div>
            <button
              onClick={handleAddProduct}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Agregar Producto
            </button>
          </div>
          
          <div className="relative -mx-2 sm:mx-0">
            {/* Scroll indicator for mobile */}
            <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          {product.type}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          {product.stock}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => handleEdit(product._id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 