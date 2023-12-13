import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { createCategoryRequest, getCategoryRequest, updateCategoryRequest } from '../../api/categories'
import InputComponent from '../../components/FormLibrary/InputComponent'
import { useNavigate, useParams } from 'react-router-dom'

function CreateCategoryPage() {
  const [name, setName] = useState({ value: '', valid: null })
  const [description, setDescription] = useState({ value: '', valid: null })
  const [oldName, setOldName] = useState('')

  const { userData, createAlert } = useContext(AuthContext)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadCategory() {
      if (params.name) {
        const data = { name: params.name, user_id: userData.user_id }
        const res = await getCategoryRequest(data)
        const category = res.data.data[0]
        setOldName(category.name)
        setName({ value: category.name, valid: 'true' })
        setDescription({ value: category.description, valid: 'true' })
      }
    }
    loadCategory()
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    if (name.valid !== 'true' || description.valid !== 'true') return
    if (params.name) {
      try {
        const data = { user_id: userData.user_id, name: oldName, newName: name.value, newDescription: description.value }
        await updateCategoryRequest(data)
        navigate('/categories')
        createAlert('success', 'Categoria actualizada con exito')
      } catch (error) {
        createAlert('error', error)
      }
    }
    else {
      try {
        const data = { user_id: userData.user_id, name: name.value, description: description.value }
        await createCategoryRequest(data)
        navigate('/categories')
        createAlert('success', 'Categoria creada con exito')
      } catch (error) {
        createAlert('error', error)
      }
    }
  }

  return (
    <div className='flex items-center justify-center font-[Roboto]'>
      <div className='flex flex-col items-center justify-center max-w-[18rem] min-[430px]:shadow-sm box-content border-borderColor min-[430px]:border-[1px] rounded-xl pb-16 px-8 min-[430px]:px-12'>
        <h2 className='self-start text-2xl pb-7 pt-16'>{params.name ? 'Actualizar categoría' : 'Crear categoría'}</h2>
        <form className="w-full mx-auto flex flex-col gap-y-4" onSubmit={onSubmit}>
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
          <button type="submit" className="text-white bg-buttonPrimary duration-200 hover:bg-buttonPrimaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{params.name ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
    </div >
  )
}
export default CreateCategoryPage