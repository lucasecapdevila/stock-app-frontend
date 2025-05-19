import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard'
import ProductsForm from '../pages/products/ProductsForm'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/productos/nuevo" element={<ProductsForm />} />
      {/* Add more admin routes here as needed */}
    </Routes>
  )
}

export default AdminRoutes
