import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { createProductRequest, getProductRequest, updateProductRequest } from '../../api/products'
import InputComponent from '../../components/FormLibrary/InputComponent'
import SelectComponent from '../../components/FormLibrary/SelectComponent'
import useCategory from '../../hooks/useCategory'
import { useNavigate, useParams } from 'react-router-dom'

function CreateProduct() {
  const [name, setName] = useState({ value: '', valid: null })
  const [description, setDescription] = useState({ value: '', valid: null })
  const [brand, setBrand] = useState({ value: '', valid: null })
  const [amount, setAmount] = useState({ value: '', valid: null })
  const [category, setCategory] = useState({ value: '', valid: null })
  const [oldName, setOldName] = useState('')

  const data = useCategory()
  const { userData, createAlert } = useContext(AuthContext)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadProduct() {
      if (params.name) {
        const data = { name: params.name, user_id: userData.user_id }
        const res = await getProductRequest(data)
        const product = res.data.data[0]
        setOldName(product.name)
        setName({ value: product.name, valid: 'true' })
        setDescription({ value: product.description, valid: 'true' })
        setBrand({ value: product.brand, valid: 'true' })
        setAmount({ value: product.amount, valid: 'true' })
        setCategory({ value: product.category, valid: 'true' })
      }
    }
    loadProduct()
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    if (name.valid !== 'true' || description.valid !== 'true' || brand.valid !== 'true' || amount.valid !== 'true' || category.valid !== 'true') return
    if (params.name) {
      try {
        const data = { user_id: userData.user_id, name: oldName, newName: name.value, newDescription: description.value, newCategory: category.value, newBrand: brand.value, newAmount: parseInt(amount.value) }
        await updateProductRequest(data)
        createAlert('success', 'Producto actualizado con éxito')
        navigate('/products')
      } catch (error) {
        createAlert('error', error)
      }
    }
    else {
      try {
        const data = { user_id: userData.user_id, name: name.value, description: description.value, category: category.value, brand: brand.value, amount: parseInt(amount.value) }
        await createProductRequest(data)
        createAlert('success', 'Producto creado con éxito')
        navigate('/products')
      } catch (error) {
        createAlert('error', error)
      }
    }

  }
  return (
    <div className='flex items-center absolute top-10 min-[430px]:relative justify-center font-[Roboto]'>
      <div className='flex flex-col items-center justify-center max-w-[18rem] xl:max-w-xl min-[430px]:shadow-sm box-content border-borderColor min-[430px]:border-[1px] rounded-xl pb-12 px-8 min-[430px]:px-12'>
        <h2 className='self-start text-2xl pb-7 pt-12'>{params.name ? 'Actualizar producto' : 'Crear producto'}</h2>
        <form className="w-full mx-auto grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-4" onSubmit={onSubmit}>
          <InputComponent
            state={name}
            changeState={setName}
            type={'text'}
            label={'Nombre'}
            placeholder={'Nombre'}
            id={'name'}
            hideIcon
            required
          />
          <InputComponent
            state={description}
            changeState={setDescription}
            type={'text'}
            label={'Descripción'}
            placeholder={'Descripción'}
            id={'description'}
            hideIcon
            required
          />
          <SelectComponent
            state={category}
            changeState={setCategory}
            label={'Categoria'}
            placeholder={'Categoria'}
            id={'category'}
            required
          >
            {
              data !== undefined && data !== null &&
              data.map((item, index) => {
                return (
                  <option value={item.name} key={index}>{item.name}</option>
                )
              })
            }
          </SelectComponent>
          <InputComponent
            state={brand}
            changeState={setBrand}
            type={'text'}
            label={'Marca'}
            placeholder={'Marca'}
            id={'brand'}
            hideIcon
            required
          />
          <InputComponent
            state={amount}
            changeState={setAmount}
            type={'number'}
            label={'Cantidad'}
            placeholder={'Cantidad'}
            id={'amount'}
            hideIcon
            required
          />
          <button type="submit" className="text-white xl:col-span-2 xl:w-80 mt-2 xl:mt-5 xl:mx-auto bg-buttonPrimary duration-200 hover:bg-buttonPrimaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{params.name ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
    </div >
  )
}
export default CreateProduct