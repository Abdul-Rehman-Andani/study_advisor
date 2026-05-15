import { X } from 'lucide-react'
import { useUIStore } from '../store/uiStore'
import { useUser } from '@clerk/clerk-react'
import NavItem from './NavItem'

const SideBar = () => {
  const closeSidebar = useUIStore((state) => state.closeSidebar)
  const { user } = useUser()

  return (
    <aside className='w-64 h-full flex flex-col bg-white border-r border-[#f0e6da] px-4 py-6 flex-shrink-0'>

      <div className='flex items-center justify-between px-2 mb-6'>
        <div className='flex items-center gap-3'>
          <img
            src={user?.imageUrl}
            alt={user?.fullName ?? 'User'}
            className='w-9 h-9 rounded-full object-cover flex-shrink-0'
          />
          <p className='font-bold text-slate-800 text-sm truncate'>{user?.fullName}</p>
        </div>
        <button
          onClick={closeSidebar}
          className='md:hidden text-gray-400 hover:text-gray-600'
        >
          <X size={20} />
        </button>
      </div>

      <nav className='flex flex-col gap-1'>
        <NavItem to='/'        label='Home'    end />
        <NavItem to='/planner' label='Planner'     />
        <NavItem to='/courses' label='Courses'     />
        <NavItem to='/tasks'   label='Tasks'       />
        <NavItem to='/profile' label='Profile'     />
      </nav>

    </aside>
  )
}

export default SideBar