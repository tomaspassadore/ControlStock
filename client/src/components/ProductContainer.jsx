/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { deleteProductRequest } from '../api/products'
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
import { useNavigate } from 'react-router-dom'


function ProductContainer({ product }) {
  const { userData, createAlert } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  const deleteProduct = async () => {
    try {
      const data = { user_id: userData.user_id, name: product.name }
      await deleteProductRequest(data)
      onClose()
      createAlert('success', 'El producto se ha eliminado con exito')
      navigate('/')
    } catch (error) {
      createAlert('error', error)
    }
  }
  const updateProduct = () => {
    navigate(`/new-product/${product.name}`)
  }

  return (
    <>
      <div key={product._id} className="text-sm bg-white gap-x-3 min-w-[750px] items-center justify-center border-b grid grid-cols-[minmax(0,_1fr)_minmax(200px,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_70px)_minmax(0,_100px)] py-3 px-5 0 hover:bg-gray-50">
        <div className='min-w-fit'>{product.name}</div>
        <div className='min-w-fit'>{product.description}</div>
        <div className='min-w-fit'>{product.category}</div>
        <div className='min-w-fit'>{product.brand}</div>
        <div className='min-w-fit font-semibold'>{product.amount}</div>
        <div className='justify-center flex gap-x-3'>
          <button onClick={updateProduct} className="font-medium text-blue-600 hover:underline">Editar</button>
          <button onClick={onOpen} className="font-medium text-red-600 hover:underline">Eliminar</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Esta seguro que quiere eliminar este producto?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={deleteProduct}>
              Eliminar
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}
export default ProductContainer