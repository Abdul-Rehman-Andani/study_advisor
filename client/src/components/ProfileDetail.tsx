import { ChevronRight } from 'lucide-react'

interface ProfileDetailProps {
  icon: React.ReactNode
  label: string
  value: string
}

const ProfileDetail = ({ icon, label, value }: ProfileDetailProps) => {
  return (
    <div className='flex items-center gap-4 px-4 py-4 border-b border-[#f0e6da] last:border-none cursor-pointer hover:bg-[#faf7f3] transition'>
      <div className='w-9 h-9 rounded-xl bg-[#f5f0e8] flex items-center justify-center text-[#7a5c3f] flex-shrink-0'>
        {icon}
      </div>
      <div className='flex-1'>
        <p className='text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5'>{label}</p>
        <p className='text-sm font-semibold text-slate-800'>{value}</p>
      </div>
      <ChevronRight size={18} className='text-gray-400' />
    </div>
  )
}

export default ProfileDetail