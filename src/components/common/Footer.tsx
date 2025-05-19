const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Stock Control. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer