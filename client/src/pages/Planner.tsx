import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import PlannerModal from '../components/PlannerModal'
import { useModalStore } from '../store/modalStore'
import { usePlans } from '../hooks/plans/usePlans'

const hours = Array.from({ length: 24 }, (_, i) => i)
const formatHour = (h: number) => `${h}:00`

const Planner = () => {
  const [currentDate, setCurrentDate]    = useState(new Date())
  const openPlannerModal                 = useModalStore((state) => state.openPlannerModal)
  const { data: events = [], isLoading } = usePlans()

  const goToPrev  = () => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() - 1); return d })
  const goToNext  = () => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + 1); return d })
  const goToToday = () => setCurrentDate(new Date())

  const isToday        = new Date().toDateString() === currentDate.toDateString()
  const currentDateStr = currentDate.toISOString().split('T')[0]

  const todaysEvents = events.filter((e: any) => {
    const eventDate = new Date(e.start).toISOString().split('T')[0]
    return eventDate === currentDateStr
  })

  const getEventForHour = (hour: number) =>
    todaysEvents.filter((e: any) => new Date(e.start).getHours() === hour)

  return (
    <div className='flex flex-col h-full max-w-5xl mx-auto'>

      {/* Header */}
      <div className='flex items-start justify-between px-6 pt-6 pb-4'>
        <div>
          <p className='text-sm text-[#a89080]'>My Learning</p>
          <h1 className='text-3xl font-bold text-slate-800'>Planner</h1>
        </div>
        <button
          onClick={openPlannerModal}
          className='w-11 h-11 rounded-2xl bg-[#7a4f2a] flex items-center justify-center text-white hover:bg-[#6a3f1a] transition flex-shrink-0'
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Date Nav */}
      <div className='flex items-center justify-between px-6 py-3 border-b border-[#f0e6da]'>
        <div>
          <p className='text-xs font-bold tracking-widest text-gray-400'>
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
          </p>
          <p className='text-lg font-bold text-slate-800'>
            {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <button onClick={goToPrev} className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400'>
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToToday}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${
              isToday
                ? 'bg-[#7a4f2a] text-white border-[#7a4f2a]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#7a4f2a]'
            }`}
          >
            TODAY
          </button>
          <button onClick={goToNext} className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400'>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Time Grid */}
      <div className='flex-1 overflow-y-auto'>
        {isLoading ? (
          <p className='text-sm text-gray-400 text-center py-8'>Loading...</p>
        ) : (
          hours.map((hour) => (
            <div key={hour} className='flex items-start border-b border-gray-100 min-h-[64px]'>
              <span className='w-14 flex-shrink-0 text-xs text-gray-400 px-3 pt-2'>
                {formatHour(hour)}
              </span>
              <div className='flex-1 border-l border-gray-100 relative min-h-[64px] p-1'>
                {getEventForHour(hour).map((event: any) => (
                  <div
                    key={event._id}
                    className='bg-[#f5ede3] border border-[#e8d0b8] rounded-xl px-3 py-2 mb-1'
                  >
                    <p className='text-xs font-bold text-[#7a4f2a]'>{event.title}</p>
                    <p className='text-[11px] text-gray-400'>
                      {new Date(event.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      {' — '}
                      {new Date(event.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <PlannerModal defaultDate={currentDateStr} />

    </div>
  )
}

export default Planner