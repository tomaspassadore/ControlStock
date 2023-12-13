import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../api/auth"
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(() => {
    const user_id = sessionStorage.getItem('user_id')
    const user = sessionStorage.getItem('user')
    const token = sessionStorage.getItem('token')
    if (user && token && user_id) return { user_id, user, token }
    else return {}
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user_id = sessionStorage.getItem('user_id')
    const user = sessionStorage.getItem('user')
    const token = sessionStorage.getItem('token')
    if (user && token && user_id) return true
    else return false
  })
  const [alert, setAlert] = useState(null)

  const createAlert = (type, message) => {
    let newAlert = {}
    if (type === 'error') {
      newAlert = { type: type, message: message.response.data.message }
      setAlert(newAlert)
      return
    }
    newAlert = { type: type, message: message }
    setAlert(newAlert)
  }

  const logout = () => {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    window.location.reload()
  }

  const login = async (data) => {
    try {
      const res = await loginRequest(data)
      if (res.data.data.token) {
        console.log(res.data.data.token)
        const id = res.data.data.id
        sessionStorage.setItem('user', data.username)
        sessionStorage.setItem('token', res.data.data.token)
        sessionStorage.setItem('user_id', res.data.data.id)
        setUserData({ user_id: id, user: data.username, token: res.data.data.token })
        setIsAuthenticated(true)
        setAlert([])
        navigate('/products')
        window.location.reload()
      }
    } catch (error) {
      createAlert('error', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        alert,
        setAlert,
        createAlert
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext