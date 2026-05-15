import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'
import { useModalStore } from '../store/modalStore'
import { useNotes } from '../hooks/notes/useNotes'
import { useCourse } from '../hooks/courses/useCourse'

const CourseDetail = () => {
  const { name: courseId }  = useParams()
  const navigate            = useNavigate()
  const openNoteModal       = useModalStore((state) => state.openNoteModal)
  const [search, setSearch] = useState('')

  const { data: course }                = useCourse(courseId ?? '')
  const { data: notes = [], isLoading } = useNotes(courseId ?? '')

  const filtered = notes.filter((n: any) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-6'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition text-slate-700'
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>
            {course?.title ?? '...'}
          </h1>
        </div>
        <button
          onClick={openNoteModal}
          className='w-11 h-11 rounded-2xl bg-[#7a4f2a] flex items-center justify-center text-white hover:bg-[#6a3f1a] transition flex-shrink-0'
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder='Search your documents...' />

      {/* Notes */}
      <div>
        <p className='text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3'>
          Course Documents
        </p>

        {isLoading ? (
          <p className='text-sm text-gray-400 text-center py-8'>Loading...</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {filtered.length > 0 ? (
              filtered.map((note: any) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  type={note.type}
                  fileUrl={note.file}
                />
              ))
            ) : (
              <p className='text-sm text-gray-400 text-center py-8 col-span-2'>No documents found</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <NoteModal courseId={courseId ?? ''} />

    </div>
  )
}

export default CourseDetail