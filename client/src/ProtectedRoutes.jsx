import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) return <Navigate to='/login' replace />

  return <Outlet />
}
export default ProtectedRoutes
