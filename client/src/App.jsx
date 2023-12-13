import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthContext from './context/AuthContext'
import SideBar from './components/SideBar'
import { useContext } from 'react'
import ProtectedRoutes from './ProtectedRoutes'
import ListProductsPage from './pages/product/ListProductsPage'
import CreateProductPage from './pages/product/CreateProductPage'
import ListCategoriesPage from './pages/category/ListCategoriesPage'
import CreateCategoryPage from './pages/category/CreateCategoryPage'
import InfoAlert from './components/FormLibrary/InfoAlert'
import LoginPage from './pages/LoginPage'
import Modal from './components/FormLibrary/ModalComponent'
import StockPage from './pages/StockPage'

const App = () => {
  const { alert, isAuthenticated } = useContext(AuthContext)

  return (
    <>
      {isAuthenticated === true ? <SideBar /> : <Navbar />}
      <main id="Main" className={`flex justify-center items-center ${isAuthenticated === true ? 'min-[930px]:ml-64' : ''} px-5 xl:px-10 h-screen`}>
        {alert !== null && <InfoAlert />}
        <Routes>
          <Route path='/prueba' element={<Modal message={'Esta seguro que quiere eliminar este producto?'} />} />
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/products' element={<ListProductsPage />} />
            <Route path='/new-product' element={<CreateProductPage />} />
            <Route path='/new-product/:name' element={<CreateProductPage />} />
            <Route path='/categories' element={<ListCategoriesPage />} />
            <Route path='/new-category' element={<CreateCategoryPage />} />
            <Route path='/new-category/:name' element={<CreateCategoryPage />} />
            <Route path='/stock/:action' element={<StockPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App
