import { Menu, Brain, LogOut } from 'lucide-react'
import { useUIStore } from '../store/uiStore'
import { useClerk } from '@clerk/clerk-react'

const Navbar = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const { signOut } = useClerk()

  return (
    <nav className='w-full h-16 flex items-center justify-between px-6 bg-white border-b border-[#f0e6da] flex-shrink-0'>

      <div className='flex items-center gap-3'>
        <button
          onClick={toggleSidebar}
          className='md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition'
        >
          <Menu size={20} />
        </button>

        <div className='flex items-center gap-2 text-[#7a4f2a] font-semibold text-base'>
          <Brain size={20} />
          Study Advisor
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className='flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition'
      >
        <LogOut size={16} />
        Logout
      </button>

    </nav>
  )
}

export default Navbar