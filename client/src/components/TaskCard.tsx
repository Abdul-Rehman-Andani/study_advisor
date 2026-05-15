import { Trash2 } from 'lucide-react'

interface TaskCardProps {
  id: string
  title: string
  description?: string
  status: 'TODO' | 'IN-PROGRESS' | 'DONE'
  date: string
  onDelete?: () => void
}

const colors = [
  'bg-note-mint',
  'bg-note-purple',
  'bg-note-blue',
  'bg-note-peach',
  'bg-note-pink',
]

const rotations = ['-rotate-3', '-rotate-2', 'rotate-2', 'rotate-3']

const pinPositions = [
  'left-4 -top-4',
  'left-10 -top-4',
  'right-4 -top-4',
  'right-10 -top-4',
]

const TaskCard = ({ id, title, description, status, date, onDelete }: TaskCardProps) => {
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1)

  const color    = colors[seed % colors.length]
  const rotate   = rotations[seed % rotations.length]
  const pinStyle = pinPositions[seed % pinPositions.length]

  return (
    <div className={`relative rounded-2xl p-5 w-full break-inside-avoid mb-6 ${color} ${rotate}`}>

      <div className={`absolute ${pinStyle}`}>
        <span className='text-2xl'>📌</span>
      </div>

      <div className='flex justify-end mb-2'>
        <span className='text-xs font-bold italic tracking-wide text-slate-700'>{status}</span>
      </div>

      <h3 className='font-bold text-slate-800 text-base mb-1'>{title}</h3>

      {description && (
        <p className='text-sm text-slate-600 mb-3'>{description}</p>
      )}

      <div className='flex items-center justify-between mt-3'>
        <span className='text-sm font-semibold text-slate-700'>{date}</span>
        <button onClick={onDelete} className='text-slate-600 hover:text-red-500 transition'>
          <Trash2 size={18} />
        </button>
      </div>

    </div>
  )
}

export default TaskCard