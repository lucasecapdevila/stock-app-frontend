import type { Product } from '../types/dashboard.types';
import type { User } from '../types/login.types';
import { fetchWithAuth } from './auth';

const URI_PRODUCTS = import.meta.env.VITE_API_PRODUCTS;
const URI_USERS = import.meta.env.VITE_API_USERS;
const URI_LOGIN = import.meta.env.VITE_API_LOGIN;

//----------------------- PRODUCTS -----------------------//

export const getProductsAPI = async (): Promise<Product[]> => {
  try {
    const response = await fetch(URI_PRODUCTS);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductByIdAPI = async (id: string): Promise<Response> => {
  try {
    const response = await fetch(`${URI_PRODUCTS}/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addProductAPI = async (newProduct: Omit<Product, 'id'>): Promise<Response> => {
  try {
    return await fetchWithAuth(URI_PRODUCTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductAPI = async (id: string, updatedProduct: Product): Promise<Response> => {
  try {
    return await fetchWithAuth(`${URI_PRODUCTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductAPI = async (id: string): Promise<Response> => {
  try {
    return await fetchWithAuth(`${URI_PRODUCTS}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

//----------------------- USERS -----------------------//

export const getUsersAPI = async (): Promise<User[]> => {
  try {
    const response = await fetch(URI_USERS);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserByIdAPI = async (id: string): Promise<Response> => {
  try {
    const response = await fetch(`${URI_USERS}/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUserAPI = async (newUser: Omit<User, 'id'>): Promise<Response | null> => {
  try {
    const response = await fetch(`${URI_USERS}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUserAPI = async (id: string, user: Partial<User>): Promise<Response | null> => {
  try {
    return await fetchWithAuth(`${URI_USERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const deleteUserAPI = async (id: string): Promise<Response | null> => {
  try {
    return await fetchWithAuth(`${URI_USERS}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
};

//----------------------- AUTH -----------------------//

export const loginAPI = async (credentials: { username: string; password: string }): Promise<Response> => {
  try {
    const response = await fetch(URI_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }
    
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}; 