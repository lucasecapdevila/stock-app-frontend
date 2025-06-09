import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userSession');
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Stock Control Logo" className="h-20 w-28" />
              <span className="ml-2 text-xl font-bold text-gray-800">Control de Inventario</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          {isLoggedIn && (
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menú</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop menu */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Panel de Productos
              </Link>
            </div>
          )}

          {/* Desktop login/logout button */}
          <div className="hidden md:flex items-center">
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isLoggedIn && isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                Panel de Productos
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 