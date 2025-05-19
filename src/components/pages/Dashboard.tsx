import { useState } from 'react';
import type { Product } from '../../types/dashboard.types';

const mockProducts: Product[] = [
  { id: '1', name: 'Filtro de Aceite Toyota Corolla', category: 'Filtros', price: 15.99, stock: 45 },
  { id: '2', name: 'Pastillas de Freno Honda Civic', category: 'Frenos', price: 49.99, stock: 30 },
  { id: '3', name: 'Bujía NGK Iridium', category: 'Motor', price: 12.99, stock: 100 },
  { id: '4', name: 'Aceite de Motor 5W-30 1L', category: 'Lubricantes', price: 8.99, stock: 75 },
  { id: '5', name: 'Amortiguador Delantero Suzuki GSX-R', category: 'Suspensión', price: 89.99, stock: 15 },
  { id: '6', name: 'Cadena de Distribución Ford Focus', category: 'Motor', price: 129.99, stock: 20 },
  { id: '7', name: 'Filtro de Aire K&N', category: 'Filtros', price: 45.99, stock: 25 },
  { id: '8', name: 'Disco de Freno Delantero Yamaha R1', category: 'Frenos', price: 79.99, stock: 18 },
  { id: '9', name: 'Aceite de Transmisión 75W-90 1L', category: 'Lubricantes', price: 14.99, stock: 40 },
  { id: '10', name: 'Bomba de Agua Nissan Sentra', category: 'Motor', price: 65.99, stock: 12 },
  { id: '11', name: 'Kit de Embrague Honda CBR600', category: 'Transmisión', price: 199.99, stock: 8 },
  { id: '12', name: 'Filtro de Combustible Toyota Camry', category: 'Filtros', price: 18.99, stock: 35 },
  { id: '13', name: 'Radiador Honda Accord', category: 'Refrigeración', price: 159.99, stock: 10 },
  { id: '14', name: 'Kit de Correa de Accesorios Hyundai Tucson', category: 'Motor', price: 89.99, stock: 22 },
  { id: '15', name: 'Sensor de Oxígeno Universal', category: 'Sensores', price: 45.99, stock: 50 },
  { id: '16', name: 'Aceite de Diferencial 80W-90 1L', category: 'Lubricantes', price: 12.99, stock: 30 },
  { id: '17', name: 'Filtro de Cabina Toyota RAV4', category: 'Filtros', price: 24.99, stock: 28 },
  { id: '18', name: 'Kit de Juntas Motor Chevrolet Cruze', category: 'Motor', price: 149.99, stock: 15 },
  { id: '19', name: 'Bomba de Dirección Hidráulica Ford Ranger', category: 'Dirección', price: 189.99, stock: 8 },
  { id: '20', name: 'Kit de Suspensión Delantera Volkswagen Golf', category: 'Suspensión', price: 299.99, stock: 12 },
  { id: '21', name: 'Sensor MAP Universal', category: 'Sensores', price: 39.99, stock: 45 },
  { id: '22', name: 'Filtro de Transmisión Automática', category: 'Filtros', price: 29.99, stock: 33 }
];

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find(p => p.id === id);
    alert(`Editando producto: ${product?.name}`);
  };

  const handleAddProduct = () => {
    // TODO: Implementar lógica para agregar producto
    alert('Aquí se agregará un producto');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="h-full p-2 sm:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-2 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Panel de Productos</h1>
              <p className="text-sm sm:text-base text-gray-600">Aquí podrás crear, ver, actualizar y eliminar productos.</p>
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
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.stock}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEdit(product.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
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
  )
}

export default Dashboard 