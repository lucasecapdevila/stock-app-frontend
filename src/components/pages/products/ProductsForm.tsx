import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { Product } from '../../../types/dashboard.types';
import { addProduct } from '../../../utils/productsStorage';

type ProductFormInputs = Omit<Product, 'id'>;

const ProductsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductFormInputs>();

  const onSubmit = (data: ProductFormInputs) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      price: Number(data.price),
      stock: Number(data.stock)
    };
    addProduct(newProduct);
    alert('¡Producto creado exitosamente!');
    reset(); // Reset form fields to empty values
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="h-full p-2 sm:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Agregar Nuevo Producto</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre del Producto
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  },
                  maxLength: {
                    value: 80,
                    message: 'El nombre debe tener como máximo 80 caracteres'
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3"
                {...register('category', {
                  required: 'La categoría es obligatoria'
                })}
              >
                <option value="">Seleccione una categoría</option>
                <option value="Filtros">Filtros</option>
                <option value="Frenos">Frenos</option>
                <option value="Motor">Motor</option>
                <option value="Lubricantes">Lubricantes</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Transmisión">Transmisión</option>
                <option value="Refrigeración">Refrigeración</option>
                <option value="Sensores">Sensores</option>
                <option value="Dirección">Dirección</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  step="1"
                  min="100"
                  max="10000000"
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-6"
                  {...register('price', {
                    required: 'El precio es obligatorio',
                    valueAsNumber: true,
                    validate: {
                      min: (value) => value >= 100 || 'El precio debe ser mayor o igual a 100',
                      max: (value) => value <= 10000000 || 'El precio debe ser menor o igual a 10,000,000'
                    }
                  })}
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                min="1"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3"
                {...register('stock', {
                  required: 'El stock es obligatorio',
                  valueAsNumber: true,
                  validate: {
                    min: (value) => value >= 1 || 'El stock debe ser mayor o igual a 1'
                  }
                })}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;