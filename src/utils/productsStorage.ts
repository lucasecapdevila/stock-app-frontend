import type { Product } from '../types/dashboard.types';

const STORAGE_KEY = 'products';

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

export const initializeProducts = () => {
  const storedProducts = localStorage.getItem(STORAGE_KEY);
  if (!storedProducts) {
    saveProducts(mockProducts);
  }
};

export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem(STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product) => {
  const products = getProducts();
  saveProducts([...products, product]);
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  saveProducts(products.filter(product => product.id !== id));
};

export const updateProduct = (updatedProduct: Product) => {
  const products = getProducts();
  saveProducts(
    products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    )
  );
}; 