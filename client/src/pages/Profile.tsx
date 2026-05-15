import { GraduationCap, BookOpen, Calendar, Pencil } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useModalStore } from '../store/modalStore'
import { useEducation } from '../hooks/education/useEducation'
import ProfileDetail from '../components/ProfileDetail'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {
  const { user }         = useUser()
  const openProfileModal = useModalStore((state) => state.openProfileModal)
  const { data: education, isLoading } = useEducation()

  return (
    <div className='p-4 sm:p-8 max-w-2xl mx-auto flex flex-col gap-8'>

      {/* Avatar & Name */}
      <div className='flex flex-col items-center gap-3 pt-4'>
        <img
          src={user?.imageUrl}
          alt={user?.fullName ?? 'User'}
          className='w-20 h-20 rounded-full object-cover'
        />
        <div className='text-center'>
          <h1 className='text-xl font-bold text-slate-800'>{user?.fullName}</h1>
          <p className='text-sm text-gray-400'>{user?.emailAddresses[0].emailAddress}</p>
        </div>
      </div>

      {/* Education Details */}
      <div>
        <div className='flex items-center justify-between mb-3'>
          <p className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>
            Education Details
          </p>
          <button
            onClick={openProfileModal}
            className='flex items-center gap-1.5 text-xs font-medium text-[#7a4f2a] hover:underline'
          >
            <Pencil size={13} />
            Edit
          </button>
        </div>

        {isLoading ? (
          <p className='text-sm text-gray-400 text-center py-4'>Loading...</p>
        ) : (
          <div className='bg-white rounded-2xl border border-[#f0e6da] overflow-hidden'>
            <ProfileDetail
              icon={<GraduationCap size={18} />}
              label='Institution'
              value={education?.university ?? '—'}
            />
            <ProfileDetail
              icon={<BookOpen size={18} />}
              label='Major / Program'
              value={education?.program ?? '—'}
            />
            <ProfileDetail
              icon={<Calendar size={18} />}
              label='Current Semester'
              value={education?.semester ?? '—'}
            />
          </div>
        )}
      </div>

      {/* Modal — no props needed */}
      <ProfileModal />

    </div>
  )
}

export default Profile