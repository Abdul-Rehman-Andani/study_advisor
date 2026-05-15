import { useTodayPlans } from '../hooks/plans/useTodayPlan'

const TodaysSchedule = () => {
  const { data: plans = [], isLoading } = useTodayPlans()

  return (
    <div>
      <h2 className='text-xl font-bold text-slate-800 mb-3'>Today's Schedule</h2>

      {isLoading ? (
        <div className='border-2 border-dashed border-[#e8ddd4] rounded-2xl p-8 flex items-center justify-center'>
          <p className='text-sm text-[#a89080]'>Loading...</p>
        </div>
      ) : plans.length === 0 ? (
        <div className='border-2 border-dashed border-[#e8ddd4] rounded-2xl p-8 flex items-center justify-center'>
          <p className='text-sm text-[#a89080]'>No plans for today</p>
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          {plans.map((plan: any) => (
            <div
              key={plan._id}
              className='bg-white border border-[#f0e6da] rounded-2xl px-4 py-3 flex items-center gap-4'
            >
              <div className='w-2 h-2 rounded-full bg-[#7a4f2a] flex-shrink-0' />
              <div className='flex-1'>
                <p className='text-sm font-semibold text-slate-800'>{plan.title}</p>
                {plan.description && (
                  <p className='text-xs text-gray-400 mt-0.5'>{plan.description}</p>
                )}
              </div>
              <div className='text-xs text-gray-400 flex-shrink-0'>
                {new Date(plan.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                {' — '}
                {new Date(plan.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodaysSchedule