import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import InputComponent from '../components/FormLibrary/InputComponent'
import SelectComponent from '../components/FormLibrary/SelectComponent'
import useProduct from '../hooks/useProduct'
import { updateStockRequest } from '../api/products'

function StockPage() {
  const [name, setName] = useState({ value: '', valid: null })
  const [amount, setAmount] = useState({ value: '', valid: null })
  const [action, setAction] = useState('add')
  const data = useProduct()

  const { userData, createAlert } = useContext(AuthContext)

  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    if (params.action === 'add') setAction('add')
    else setAction('remove')
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    if (name.valid !== 'true' || amount.valid !== 'true') return
    if (params.action === 'add') {
      try {
        const data = { user_id: userData.user_id, name: name.value, amount: parseInt(amount.value) }
        await updateStockRequest(data)
        createAlert('success', 'Stock actualizado con exito')
        setTimeout(() => {
          navigate('/products')
          return clearTimeout()
        }, 1000)
      } catch (error) {
        createAlert('error', error)
      }
    }
    else {
      try {
        const data = { user_id: userData.user_id, name: name.value, amount: parseInt(-amount.value) }
        await updateStockRequest(data)
        createAlert('success', 'Stock actualizado con exito')
        setTimeout(() => {
          navigate('/products')
          return clearTimeout()
        }, 1000)
      } catch (error) {
        createAlert('error', error)
      }
    }
  }

  return (
    <div className='flex items-center justify-center font-[Roboto]'>
      <div className='flex flex-col items-center justify-center max-w-[18rem] min-[430px]:shadow-sm box-content border-borderColor min-[430px]:border-[1px] rounded-xl pb-16 px-8 min-[430px]:px-12'>
        <h2 className='self-start text-2xl pb-7 pt-16'>{action === 'add' ? 'Agregar stock' : 'Quitar stock'}</h2>
        <form className="w-full mx-auto flex flex-col gap-y-4" onSubmit={onSubmit}>
          <SelectComponent
            state={name}
            changeState={setName}
            label={'Producto'}
            placeholder={'Producto'}
            id={'product'}
            required
          >
            {
              data !== undefined &&
              data.map((item, index) => {
                return (
                  <option value={item.name} key={index}>{item.name}</option>
                )
              })
            }
          </SelectComponent>
          <InputComponent
            state={amount}
            changeState={setAmount}
            type={'text'}
            label={'Cantidad'}
            placeholder={'Cantidad'}
            id={'amount'}
            hideIcon
            messageError={'Solo se permiten números positivos'}
            regularExpressions={/^\d{1,20}$/}
            required
          />
          <button type="submit" className={`${params.action === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white duration-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>{params.action === 'add' ? 'Agregar' : 'Quitar'}</button>
        </form>
      </div>
    </div >
  )
}
export default StockPage