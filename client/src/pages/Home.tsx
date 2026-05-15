import { BookOpen, CheckSquare } from 'lucide-react'
import StatCard from '../components/StatCard'
import TodaysSchedule from '../components/TodaysSchedule'
import CourseCard from '../components/CourseCard'
import { useTotalStats } from '../hooks/stats/useTotalStats'
import { useCourses } from '../hooks/courses/useCourses'

const Home = () => {
  const { data: stats, isLoading: statsLoading }     = useTotalStats()
  const { data: courses = [], isLoading: coursesLoading } = useCourses()

  return (
    <div className='p-4 sm:p-8 flex flex-col gap-8 max-w-5xl mx-auto'>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <StatCard
          icon={<BookOpen size={20} />}
          label='Total Courses'
          value={statsLoading ? '...' : stats?.totalCourses ?? 0}
        />
        <StatCard
          icon={<CheckSquare size={20} />}
          label='Total Tasks'
          value={statsLoading ? '...' : stats?.totalTasks ?? 0}
        />
      </div>

      {/* Today's Schedule */}
      <TodaysSchedule />

      {/* Course Cards */}
      {coursesLoading ? (
        <p className='text-sm text-gray-400 text-center py-4'>Loading courses...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {courses.map((course: any) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              lessons={course.lessons ?? 0}
              updatedAt={new Date(course.updatedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
              tag={course.category}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default Home