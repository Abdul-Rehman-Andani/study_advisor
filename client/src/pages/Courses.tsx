import { useState } from 'react'
import { Plus } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CourseCard from '../components/CourseCard'
import CourseModal from '../components/CourseModal'
import { useModalStore } from '../store/modalStore'
import { useCourses } from '../hooks/courses/useCourses'
import { useDeleteCourse } from '../hooks/courses/useDeleteCourse'

const Courses = () => {
  const [search, setSearch] = useState('')
  const openCourseModal     = useModalStore((state) => state.openCourseModal)

  const { data: courses = [], isLoading, isError } = useCourses()
  const { mutate: deleteCourse }                   = useDeleteCourse()

  const filtered = courses.filter((c: any) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-6'>

      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-[#a89080]'>My Learning</p>
          <h1 className='text-3xl font-bold text-slate-800'>Courses</h1>
        </div>
        <button
          onClick={openCourseModal}
          className='w-11 h-11 rounded-full bg-[#7a4f2a] flex items-center justify-center text-white hover:bg-[#6a3f1a] transition flex-shrink-0'
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder='Search your courses...' />

      {/* Course List */}
      <div>
        <h2 className='text-sm font-bold text-slate-800 mb-3'>Active Courses</h2>

        {isLoading && (
          <p className='text-sm text-gray-400 text-center py-8'>Loading...</p>
        )}

        {isError && (
          <p className='text-sm text-red-400 text-center py-8'>Failed to load courses</p>
        )}

        {!isLoading && !isError && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            {filtered.length > 0 ? (
              filtered.map((course: any) => (
                <CourseCard
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  lessons={course.lessons ?? 0}
                  updatedAt={new Date(course.updatedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  tag={course.category}
                  onDelete={() => deleteCourse(course._id)}
                />
              ))
            ) : (
              <p className='text-sm text-gray-400 col-span-2 text-center py-8'>No courses found</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <CourseModal />

    </div>
  )
}

export default Courses