import { useState } from 'react'
import { X } from 'lucide-react'
import { useModalStore } from '../store/modalStore'
import { useCreateCourse } from '../hooks/courses/useCreateCourse'

const CourseModal = () => {
  const { courseModalOpen, closeCourseModal } = useModalStore()
  const { mutate: createCourse, isPending }   = useCreateCourse()

  const [title, setTitle] = useState('')
  const [tag, setTag]     = useState('')

  if (!courseModalOpen) return null

  const handleSave = () => {
    if (!title.trim()) return
    createCourse(
      { title, category: tag.toUpperCase() || 'GENERAL' },
      {
        onSuccess: () => {
          setTitle('')
          setTag('')
          closeCourseModal()
        },
      }
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={closeCourseModal} />
      <div className='relative w-full max-w-lg bg-white rounded-3xl p-6 flex flex-col gap-5 z-10'>

        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-800'>Add New Course</h2>
          <button onClick={closeCourseModal} className='text-gray-400 hover:text-gray-600 transition'>
            <X size={20} />
          </button>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs text-gray-500'>Course Name</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. Data Engineering'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs text-gray-500'>Course Category</label>
          <input
            type='text'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder='Technology / Business / Science'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className='w-full bg-[#7a4f2a] text-white font-bold text-sm py-4 rounded-2xl hover:bg-[#6a3f1a] transition disabled:opacity-50'
        >
          {isPending ? 'Saving...' : 'Save Course'}
        </button>

      </div>
    </div>
  )
}

export default CourseModal