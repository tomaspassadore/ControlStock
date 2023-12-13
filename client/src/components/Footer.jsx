import { useLocation } from 'react-router-dom'

function Footer() {
  const { pathname } = useLocation()
  if (pathname === '/login') {
    return (
      <div className='h-16 w-screen flex left-0 absolute bottom-0 border-t-[1px] border-borderColor dark:border-[#27272a] bg-backgroundColor justify-center items-center'>
        <p className='text-zinc-400'>© Copyright 2023</p>
      </div>
    )
  }
}
export default Footer
