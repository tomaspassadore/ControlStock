import { useState, useContext, useEffect } from 'react'
import { Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) navigate('/products')
  }, [isAuthenticated])


  const onChangeUsername = e => setUsername(e.target.value)
  const onChangePassword = e => setPassword(e.target.value)

  const onSubmit = async e => {
    e.preventDefault()
    const data = { username: username, password: password }
    login(data)
  }
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <div className='h-full flex items-center justify-center font-[Roboto]'>
      <div className='flex flex-col items-center justify-center max-w-[15rem] min-[430px]:shadow-sm box-content border-borderColor min-[430px]:border-[1px] rounded-xl pb-12 px-6 min-[430px]:px-10'>
        <h2 className='self-start text-2xl pb-7 pt-14'>Inicia sesión</h2>
        <form className="w-full mx-auto flex flex-col gap-y-4" onSubmit={onSubmit}>
          <label htmlFor="username" className='text-[15px]'>Username
            <Input onChange={onChangeUsername} placeholder='Username' focusBorderColor='#49bebc' id='username' />
          </label>
          <label htmlFor="password" className='text-[15px]'>Password
            <InputGroup size='md'>
              <Input
                onChange={onChangePassword}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Password'
                focusBorderColor='#49bebc'
                id='password'
              />
              <InputRightElement width='4.5rem' mr='-3px'>
                <Button h='2rem' size='sm' fontWeight='400' textColor='gray.500' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </label>
          <button type="submit" className="text-white bg-buttonPrimary duration-200 hover:bg-buttonPrimaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Enviar</button>
        </form>
      </div>
    </div >
  )
}

export default LoginPage
