import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* Add more admin routes here as needed */}
    </Routes>
  )
}

export default AdminRoutes
