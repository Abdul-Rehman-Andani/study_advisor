import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <div className='flex items-center gap-3 bg-white border border-[#f0e6da] rounded-2xl px-4 py-3 w-full'>
      <Search size={18} className='text-gray-400 flex-shrink-0' />
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='flex-1 bg-transparent text-sm text-slate-700 placeholder:text-gray-400 outline-none'
      />
    </div>
  )
}

export default SearchBar