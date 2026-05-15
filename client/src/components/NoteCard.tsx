import { ChevronRight, FileText } from 'lucide-react'

interface NoteCardProps {
  title: string
  type: string
  fileUrl?: string
}

const NoteCard = ({ title, type, fileUrl }: NoteCardProps) => {

  

  const handleClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank')
    }
  }

  return (
    <div
      onClick={handleClick}
      className='bg-white rounded-2xl border border-[#f0e6da] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#faf7f3] transition'
    >
      <div className='w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0'>
        <FileText size={22} className='text-red-400' />
      </div>
      <div className='flex-1'>
        <h3 className='font-semibold text-slate-800 text-sm'>{title}</h3>
        <p className='text-xs text-gray-400 mt-0.5'>{type}</p>
      </div>
      <ChevronRight size={18} className='text-gray-400' />
    </div>
  )
}

export default NoteCard