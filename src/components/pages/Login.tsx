import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit = (data: LoginFormInputs) => {
    // Hardcoded credentials for development
    const validUsername = 'admin'
    const validPassword = 'admin123'

    if (data.username === validUsername && data.password === validPassword) {
      // Store login state in sessionStorage
      sessionStorage.setItem('isLoggedIn', 'true')
      // Redirect to admin page
      navigate('/admin')
    } else {
      setLoginError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-2">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Ingreso de Administrador
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
                {...register('username', {
                  required: 'El nombre de usuario es obligatorio',
                  minLength: {
                    value: 5,
                    message: 'El nombre de usuario debe tener al menos 5 caracteres',
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
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ingresar
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