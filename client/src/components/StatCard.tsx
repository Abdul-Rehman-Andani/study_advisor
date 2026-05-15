// components/StatCard.tsx

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className='bg-white rounded-2xl border border-[#f0e6da] p-5 flex flex-col gap-4'>

      {/* Icon */}
      <div className='w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center text-[#7a5c3f]'>
        {icon}
      </div>

      {/* Label & Value */}
      <div>
        <p className='text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1'>
          {label}
        </p>
        <p className='text-3xl font-bold text-slate-700'>
          {value}
        </p>
      </div>

    </div>
  )
}

export default StatCard