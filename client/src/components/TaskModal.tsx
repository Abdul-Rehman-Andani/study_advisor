import { useState } from 'react'
import { X } from 'lucide-react'
import { useModalStore } from '../store/modalStore'
import { useCreateTask } from '../hooks/tasks/useCreateTask'

type Status = 'todo' | 'in-progress' | 'completed'

const statuses: Status[] = ['todo', 'in-progress', 'completed']

const TaskModal = () => {
  const { taskModalOpen, closeTaskModal } = useModalStore()
  const { mutate: createTask, isPending } = useCreateTask()

  const [title, setTitle]             = useState('')
  const [status, setStatus]           = useState<Status>('todo')
  const [description, setDescription] = useState('')

  if (!taskModalOpen) return null

  const handleSave = () => {
    if (!title.trim()) return
    createTask(
      { title, status, description },
      {
        onSuccess: () => {
          setTitle('')
          setStatus('todo')
          setDescription('')
          closeTaskModal()
        },
      }
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={closeTaskModal} />
      <div className='relative w-full max-w-lg bg-white rounded-3xl p-6 flex flex-col gap-5 z-10'>

        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-800'>Create New Task</h2>
          <button onClick={closeTaskModal} className='text-gray-400 hover:text-gray-600 transition'>
            <X size={20} />
          </button>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Task Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='What needs to be done?'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Status</label>
          <div className='flex gap-2'>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold tracking-wide border transition ${
                  status === s
                    ? 'bg-[#7a4f2a] text-white border-[#7a4f2a]'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-[#7a4f2a]'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Add more details...'
            rows={4}
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none resize-none'
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className='w-full bg-[#7a4f2a] text-white font-bold tracking-widest text-sm py-4 rounded-2xl hover:bg-[#6a3f1a] transition uppercase disabled:opacity-50'
        >
          {isPending ? 'Saving...' : 'Save Note'}
        </button>

      </div>
    </div>
  )
}

export default TaskModal