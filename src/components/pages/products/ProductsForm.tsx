import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../../../types/dashboard.types';
import { addProductAPI, getProductByIdAPI, updateProductAPI } from '../../../utils/queries';
import { useEffect } from 'react';

type ProductFormInputs = Omit<Product, 'id'>;

interface ProductsFormProps {
  editMode: boolean;
  title: string;
}

const ProductsForm = ({ editMode, title }: ProductsFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductFormInputs>();

  useEffect(() => {
    if (editMode) {
      loadDataInForm();
    }
  }, []);

  const loadDataInForm = async () => {
    try {
      const response = await getProductByIdAPI(id!);
      if (response.status === 200) {
        const product = await response.json();
        setValue('name', product.name);
        setValue('type', product.type);
        setValue('price', product.price);
        setValue('stock', product.stock);
      } else {
        alert('Error al cargar el producto');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Error al cargar el producto');
      navigate('/admin');
    }
  };

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      if (editMode) {
        if (!id) {
          alert('ID del producto no encontrado');
          navigate('/admin');
          return;
        }

        const updatedProduct: Product = {
          ...data,
          price: Number(data.price),
          stock: Number(data.stock)
        };

        const response = await updateProductAPI(id, updatedProduct);
        if (response.status === 200) {
          alert(`El producto ${updatedProduct.name} fue modificado exitosamente.`);
          navigate('/admin');
        } else {
          alert('Error al actualizar el producto');
        }
      } else {
        const response = await addProductAPI(data);
        if (response.status === 201) {
          alert(`El producto fue creado exitosamente.`);
          navigate('/admin');
        } else {
          alert('Error al crear el producto');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ha ocurrido un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="h-full p-2 sm:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {title}
          </h1>
          
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
                    value: 100,
                    message: 'El nombre debe tener como máximo 100 caracteres'
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="type"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3"
                {...register('type', {
                  required: 'El tipo es obligatorio'
                })}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Económico">Económico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Premium">Premium</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
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
                min="0"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3"
                {...register('stock', {
                  required: 'El stock es obligatorio',
                  valueAsNumber: true,
                  validate: {
                    min: (value) => value >= 0 || 'El stock debe ser mayor o igual a 0'
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
                onClick={() => navigate('/admin')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editMode ? 'Actualizar Producto' : 'Guardar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;