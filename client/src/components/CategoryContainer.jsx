/* eslint-disable react/prop-types */
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { deleteCategoryRequest } from '../api/categories'
import { useNavigate } from 'react-router-dom'

function CategoryContainer({ category }) {
  const { userData, createAlert } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  const deleteCategory = async () => {
    try {
      const data = { user_id: userData.user_id, name: category.name }
      await deleteCategoryRequest(data)
      onClose()
      createAlert('success', 'La categoría se ha eliminado con exito')
      setTimeout(() => {
        location.reload()
        return clearTimeout()
      }, 1000)
    } catch (error) {
      createAlert('error', error)
    }
  }

  const updateCategory = () => {
    navigate(`/new-category/${category.name}`)
  }

  return (
    <>
      <div key={category._id} className="text-sm bg-white gap-x-3 min-w-[600px] border-b grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_100px)] justify-between py-3 px-5 hover:bg-gray-100 ">
        <div>{category.name}</div>
        <div>{category.description}</div>
        <div className='justify-center flex gap-x-3'>
          <button onClick={updateCategory} className="font-medium text-blue-600 hover:underline">Editar</button>
          <button onClick={onOpen} className="font-medium text-red-600 hover:underline">Eliminar</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar categoría</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Esta seguro que quiere eliminar esta categoría?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={deleteCategory}>
              Eliminar
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CategoryContainer