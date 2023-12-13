import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getAllProductsRequest } from '../api/products'

const useProduct = () => {
  const [data, setData] = useState()
  const { userData, createAlert } = useContext(AuthContext)

  useEffect(() => {
    getAllProductsRequest(userData.user_id)
      .then(res => setData(res.data.data))
      .catch(error => createAlert('error', error))
  }, [])
  return data
}

export default useProduct