import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

interface ProtectedRoutesProps {
  children: ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoutes
