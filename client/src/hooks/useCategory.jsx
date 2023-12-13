import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getAllCategoriesRequest } from '../api/categories'

const useCategory = () => {
  const [data, setData] = useState()
  const { userData, createAlert } = useContext(AuthContext)

  useEffect(() => {
    getAllCategoriesRequest(userData.user_id)
      .then(res => setData(res.data.data))
      .catch(error => createAlert('error', error))
  }, [])
  return data
}

export default useCategory