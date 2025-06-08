import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProtectedRoutesProps {
  children: ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoutes
