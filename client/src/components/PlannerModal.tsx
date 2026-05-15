import { useState } from 'react'
import { X } from 'lucide-react'
import { useModalStore } from '../store/modalStore'
import { useCreatePlan } from '../hooks/plans/useCreatePlan'

const PlannerModal = ({ defaultDate }: { defaultDate?: string }) => {
  const { plannerModalOpen, closePlannerModal } = useModalStore()
  const { mutate: createPlan, isPending }       = useCreatePlan()

  const [title, setTitle]             = useState('')
  const [date, setDate]               = useState(defaultDate ?? new Date().toISOString().split('T')[0])
  const [startTime, setStartTime]     = useState('09:00')
  const [endTime, setEndTime]         = useState('10:00')
  const [description, setDescription] = useState('')

  if (!plannerModalOpen) return null

  const handleSave = () => {
    if (!title.trim()) return

    // combine date + time into full ISO datetime
    const start = new Date(`${date}T${startTime}:00`).toISOString()
    const end   = new Date(`${date}T${endTime}:00`).toISOString()

    createPlan(
      { title, start, end, description },
      {
        onSuccess: () => {
          setTitle('')
          setDate(defaultDate ?? new Date().toISOString().split('T')[0])
          setStartTime('09:00')
          setEndTime('10:00')
          setDescription('')
          closePlannerModal()
        },
      }
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={closePlannerModal} />
      <div className='relative w-full max-w-lg bg-white rounded-3xl p-6 flex flex-col gap-5 z-10'>

        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-800'>Add New Event</h2>
          <button onClick={closePlannerModal} className='text-gray-400 hover:text-gray-600 transition'>
            <X size={20} />
          </button>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Event Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='What is this event?'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none'
          />
        </div>

        <div className='flex gap-3'>
          <div className='flex flex-col gap-1.5 flex-1'>
            <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Start Time</label>
            <input
              type='time'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none'
            />
          </div>
          <div className='flex flex-col gap-1.5 flex-1'>
            <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>End Time</label>
            <input
              type='time'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Add more details...'
            rows={3}
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none resize-none'
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className='w-full bg-[#7a4f2a] text-white font-bold tracking-widest text-sm py-4 rounded-2xl hover:bg-[#6a3f1a] transition uppercase disabled:opacity-50'
        >
          {isPending ? 'Saving...' : 'Save Event'}
        </button>

      </div>
    </div>
  )
}

export default PlannerModal