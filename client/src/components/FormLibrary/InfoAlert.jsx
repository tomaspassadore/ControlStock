import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'


function InfoAlert() {
  const { alert, setAlert } = useContext(AuthContext)
  const { pathname } = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setAlert(null)
      return clearTimeout()
    }, 5000)
  }, [])

  return (
    <div className={`w-[95%] left-0 mx-auto right-0 absolute ${pathname === '/login' ? 'bottom-20' : 'bottom-10'} z-50`}>
      <Alert status={alert.type} rounded={'lg'} sx={{ display: 'flex' }} variant='subtle'>
        <AlertIcon ml='10px' />
        <p>{alert.message}</p>
        <CloseButton
          sx={{ position: 'absolute', right: '3' }}
          onClick={() => setAlert(null)}
        />
      </Alert>
    </div>
  )
}
export default InfoAlert