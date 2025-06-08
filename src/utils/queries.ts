import type { Product } from '../types/dashboard.types';
import type { User, UserSession } from '../types/login.types';

const URI_PRODUCTS = import.meta.env.VITE_API_PRODUCTS;
const URI_USERS = import.meta.env.VITE_API_USERS;
const URI_LOGIN = import.meta.env.VITE_API_LOGIN;

const getAuthToken = (): string | null => {
  const session = sessionStorage.getItem('userSession');
  if (!session) return null;
  try {
    const { token } = JSON.parse(session) as UserSession;
    return token;
  } catch {
    return null;
  }
};

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

export const addProductAPI = async (newProduct: Product): Promise<Response> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(URI_PRODUCTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(newProduct),
    });
    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductAPI = async (id: string, updatedProduct: Product): Promise<Response> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${URI_PRODUCTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(updatedProduct),
    });
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductAPI = async (id: string): Promise<Response> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${URI_PRODUCTS}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-token': token
      }
    });
    return response;
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
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${URI_USERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const deleteUserAPI = async (id: string): Promise<Response | null> => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${URI_USERS}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-token': token
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
};

//----------------------- AUTH -----------------------//

export const loginAPI = async (credentials: { email: string; password: string }): Promise<Response | null> => {
  try {
    const response = await fetch(URI_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}; 