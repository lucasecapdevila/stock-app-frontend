import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard'
import ProductsForm from '../pages/products/ProductsForm'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="productos/nuevo" element={<ProductsForm editMode={false} title='Crear nuevo producto' />} />
      <Route path="productos/editar/:id" element={<ProductsForm editMode={true} title='Editar producto' />} />
      {/* Add more admin routes here as needed */}
    </Routes>
  )
}

export default AdminRoutes
