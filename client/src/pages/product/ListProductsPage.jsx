import useProduct from '../../hooks/useProduct'
import ProductContainer from '../../components/ProductContainer'

function ListProductsPage() {
  const data = useProduct()

  if (data == null) {
    return (
      <div className='flex flex-col items-center gap-y-3'>
        <h3 className='text-lg'>No existen productos aún</h3>
        <button className="text-white bg-buttonPrimary duration-200 hover:bg-buttonPrimaryHover font-medium rounded-md text-md px-5 py-2.5 mb-2"><a href="/new-product">Crear producto</a></button>
      </div>
    )
  }
  else {
    return (
      <div className="relative overflow-x-auto shadow-md rounded-lg ">
        <div className='text-sm font-semibold header py-3 px-5 gap-x-3 grid grid-cols-[minmax(0,_1fr)_minmax(200px,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_70px)_minmax(0,_100px)] min-w-[750px] bg-gray-100'>
          <div>Nombre</div>
          <div>Descripción</div>
          <div>Categoría</div>
          <div>Marca</div>
          <div>Cantidad</div>
          <div></div>
        </div>
        {
          data !== undefined && data !== null &&
          data.map((product, index) => {
            return <ProductContainer product={product} key={index} />
          })
        }
      </div >
    )
  }
}
export default ListProductsPage