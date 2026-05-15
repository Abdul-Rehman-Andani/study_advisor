import { useState } from 'react'
import { Plus } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import { useModalStore } from '../store/modalStore'
import { useTasks } from '../hooks/tasks/useTask'
import { useDeleteTask } from '../hooks/tasks/useDeleteTask'

const Tasks = () => {
  const [search, setSearch] = useState('')
  const openTaskModal       = useModalStore((state) => state.openTaskModal)

  const { data: tasks = [], isLoading, isError } = useTasks()
  const { mutate: deleteTask }                   = useDeleteTask()

  const filtered = tasks.filter((t: any) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-6'>

      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-[#a89080]'>My Learning</p>
          <h1 className='text-3xl font-bold text-slate-800'>Sticky Notes</h1>
        </div>
        <button
          onClick={openTaskModal}
          className='w-11 h-11 rounded-2xl bg-[#7a4f2a] flex items-center justify-center text-white hover:bg-[#6a3f1a] transition flex-shrink-0'
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder='Search your tasks...' />

      {/* Masonry */}
      {isLoading && (
        <p className='text-sm text-gray-400 text-center py-12'>Loading...</p>
      )}

      {isError && (
        <p className='text-sm text-red-400 text-center py-12'>Failed to load tasks</p>
      )}

      {!isLoading && !isError && (
        filtered.length > 0 ? (
          <div className='columns-1 sm:columns-2 lg:columns-3 gap-6 mt-2'>
            {filtered.map((task: any) => (
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
                date={new Date(task.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                onDelete={() => deleteTask(task._id)}
              />
            ))}
          </div>
        ) : (
          <p className='text-sm text-gray-400 text-center py-12'>No tasks found</p>
        )
      )}

      {/* Modal */}
      <TaskModal />

    </div>
  )
}

export default Tasks