import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/dashboard.types';
import { getProductsAPI, deleteProductAPI, updateProductAPI } from '../../utils/queries';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingStock, setEditingStock] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProductsAPI();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleStockChange = (id: string, value: number) => {
    setEditingStock(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleStockBlur = async (id: string) => {
    if (editingStock[id] !== undefined) {
      try {
        const product = products.find(p => p._id === id);
        if (!product) return;

        const updatedProduct = {
          ...product,
          stock: editingStock[id]
        };

        const response = await updateProductAPI(id, updatedProduct);
        if (response.ok) {
          // Update local state after successful API call
          setProducts(prevProducts => 
            prevProducts.map(p => 
              p._id === id 
                ? { ...p, stock: editingStock[id] }
                : p
            )
          );
        } else {
          alert('Error al actualizar el stock');
        }
        
        // Clear the editing state
        setEditingStock(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      } catch (error) {
        console.error('Error updating stock:', error);
        alert('Error al actualizar el stock');
      }
    }
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
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
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
                    {filteredProducts.map((product) => (
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
                          {editingStock[product._id] !== undefined ? (
                            <input
                              type="number"
                              value={editingStock[product._id]}
                              onChange={(e) => handleStockChange(product._id, parseInt(e.target.value) || 0)}
                              onBlur={() => handleStockBlur(product._id)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                            />
                          ) : (
                            <span 
                              onClick={() => handleStockChange(product._id, product.stock)}
                              className="cursor-pointer hover:text-blue-600"
                            >
                              {product.stock}
                            </span>
                          )}
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