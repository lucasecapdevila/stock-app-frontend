import type { UserSession } from '../types/login.types';

const REFRESH_TOKEN_ENDPOINT = import.meta.env.VITE_API_REFRESH_TOKEN;

export const getAuthToken = (): string | null => {
  const session = sessionStorage.getItem('userSession');
  if (!session) return null;
  try {
    const { token } = JSON.parse(session) as UserSession;
    return token;
  } catch {
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  const session = sessionStorage.getItem('userSession');
  if (!session) return null;
  try {
    const { refreshToken } = JSON.parse(session) as UserSession;
    return refreshToken;
  } catch {
    return null;
  }
};

export const updateSession = (sessionData: UserSession): void => {
  sessionStorage.setItem('userSession', JSON.stringify(sessionData));
};

export const clearSession = (): void => {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('userSession');
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearSession();
      return false;
    }

    const { token, refreshToken: newRefreshToken, user } = await response.json();
    updateSession({ token, refreshToken: newRefreshToken, user });
    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    clearSession();
    return false;
  }
};

// Interceptor to handle token refresh
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    throw new Error('No refresh token found');
  }

  // Add refresh token to headers
  const headers = {
    ...options.headers,
    'x-token': currentRefreshToken,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // If token is expired, try to refresh it
    if (response.status === 401) {
      const refreshSuccess = await refreshToken();
      if (refreshSuccess) {
        // Retry the original request with new refresh token
        const newRefreshToken = getRefreshToken();
        if (!newRefreshToken) throw new Error('Failed to get new refresh token');
        
        const newHeaders = {
          ...options.headers,
          'x-token': newRefreshToken,
        };
        return fetch(url, { ...options, headers: newHeaders });
      }
    }

    return response;
  } catch (error) {
    console.error('Error in fetchWithAuth:', error);
    throw error;
  }
}; 