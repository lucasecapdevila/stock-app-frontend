import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

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
  { id: '12', name: 'Filtro de Combustible Toyota Camry', category: 'Filtros', price: 18.99, stock: 35 }
];

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleAddProduct = () => {
    // TODO: Implementar lógica para agregar producto
    alert('Aquí se agregará un producto');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel de Productos</h1>
            <p className="text-gray-600">Aquí podrás crear, ver, actualizar y eliminar productos.</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Agregar Producto
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
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
  )
}

export default Dashboard 