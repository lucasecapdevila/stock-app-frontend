import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { LoginFormInputs } from '../../types/login.types'

interface UserCredentials {
  password: string
  role: string
  lastLogin: string | null
}

interface CredentialsMap {
  [key: string]: UserCredentials
}

const Login = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const validateCredentials = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would be an API call
    const validCredentials: CredentialsMap = {
      'juanpilopez': {
        password: 'juanpilopez123',
        role: 'admin',
        lastLogin: null
      }
    }

    const user = validCredentials[username]
    
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    if (user.password !== password) {
      throw new Error('Contraseña incorrecta')
    }

    // Update last login time
    user.lastLogin = new Date().toISOString()
    
    return true
  }

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true)
      setLoginError('')
      
      const isValid = await validateCredentials(data.username, data.password)
      
      if (isValid) {
        // Store login state and user info in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true')
        sessionStorage.setItem('username', data.username)
        sessionStorage.setItem('loginTime', new Date().toISOString())
        
        // Redirect to admin page using React Router
        navigate('/admin')
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full items-center justify-center px-2">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Ingresar
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de Usuario
              </label>
              <input
                id="username"
                type="text"
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Nombre de Usuario"
                disabled={isLoading}
                {...register('username', {
                  required: 'El nombre de usuario es obligatorio',
                  minLength: {
                    value: 5,
                    message: 'El nombre de usuario debe tener al menos 5 caracteres',
                  },
                  maxLength: {
                    value: 25,
                    message: 'El nombre de usuario debe tener como máximo 25 caracteres',
                  },
                  pattern: {
                    value: /^[a-z]+$/,
                    message: 'El nombre de usuario solo puede contener letras minúsculas',
                  },
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Contraseña"
                disabled={isLoading}
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
            {loginError && (
              <p className="mt-2 text-center text-sm text-red-600">{loginError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login