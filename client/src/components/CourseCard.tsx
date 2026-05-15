import { BookOpen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CourseCardProps {
  id: string
  title: string
  lessons: number
  updatedAt: string
  tag: string
  onDelete?: () => void
}

const CourseCard = ({ id, title, lessons, updatedAt, tag, onDelete }: CourseCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/courses/${id}`)}
      className='bg-white rounded-2xl border border-[#f0e6da] p-4 flex flex-col gap-4 cursor-pointer hover:bg-[#faf7f3] transition'
    >
      <div className='flex items-start justify-between'>
        <div className='w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center text-[#7a5c3f]'>
          <BookOpen size={18} />
        </div>
        <span className='text-[10px] font-bold tracking-widest text-[#7a5c3f] bg-[#f5f0e8] px-2 py-1 rounded-lg'>
          {tag}
        </span>
      </div>

      <div className='flex items-end justify-between'>
        <div>
          <h3 className='font-semibold text-slate-800 text-sm mb-1'>{title}</h3>
          <p className='text-xs text-gray-400'>{lessons} Lessons · Updated {updatedAt}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
          className='text-gray-300 hover:text-red-400 transition'
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default CourseCard