import useCategory from "../../hooks/useCategory"
import CategoryContainer from "../../components/CategoryContainer"

function ListCategoriesPage() {
  const data = useCategory()

  if (data == null) {
    return (
      <div className='flex flex-col items-center gap-y-3'>
        <h3 className='text-lg'>No existen categorías aún</h3>
        <button className="text-white bg-buttonPrimary duration-200 hover:bg-buttonPrimaryHover font-medium rounded-md text-md px-5 py-2.5 mb-2"><a href="/new-category">Crear categoría</a></button>
      </div>
    )
  }
  else {
    return (
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <div className='text-sm font-semibold header py-3 px-5 gap-x-3 grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_100px)] min-w-[600px] bg-gray-100'>
          <div>Nombre</div>
          <div>Descripción</div>
          <div></div>
        </div>
        {
          data !== undefined &&
          data.map((category, index) => {
            return <CategoryContainer category={category} key={index} />
          })
        }
      </div >
    )
  }
}
export default ListCategoriesPage