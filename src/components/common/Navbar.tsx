import { Link, useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para limpiar el token o cualquier dato de sesión
    localStorage.removeItem('token'); // Si estás usando token en localStorage
    // Redirigir a la página de inicio
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">Stock Control</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/productos" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Productos
            </Link>
            <Link to="/categorias" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Categorías
            </Link>
            <Link to="/reportes" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Reportes
            </Link>
          </div>

          <div className="flex items-center">
            <button 
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 