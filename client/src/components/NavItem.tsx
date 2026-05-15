import { NavLink } from 'react-router-dom'
import { useUIStore } from '../store/uiStore'

interface NavItemProps {
  to: string
  label: string
  end?: boolean
}

const NavItem = ({ to, label, end = false }: NavItemProps) => {
  const closeSidebar = useUIStore((state) => state.closeSidebar)

  return (
    <NavLink
      to={to}
      end={end}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-[#f5f0e8] text-[#7a5c3f] font-semibold'
            : 'text-primary hover:bg-[#faf7f3] hover:text-[#7a5c3f]'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default NavItem