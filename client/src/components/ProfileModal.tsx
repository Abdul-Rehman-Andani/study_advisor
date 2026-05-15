import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useModalStore } from '../store/modalStore'
import { useEducation } from '../hooks/education/useEducation'
import { useCreateEducation } from '../hooks/education/useCreateEducation'
import { useUpdateEducation } from '../hooks/education/useUpdateEducation'

const ProfileModal = () => {
  const { profileModalOpen, closeProfileModal } = useModalStore()

  const { data: education }                         = useEducation()
  const { mutate: createEducation, isPending: creating } = useCreateEducation()
  const { mutate: updateEducation, isPending: updating } = useUpdateEducation()

  const isPending = creating || updating

  const [institution, setInstitution] = useState('')
  const [major, setMajor]             = useState('')
  const [semester, setSemester]       = useState('')

  // prefill when data loads
  useEffect(() => {
    if (education) {
      setInstitution(education.university ?? '')
      setMajor(education.program ?? '')
      setSemester(education.semester ?? '')
    }
  }, [education])

  if (!profileModalOpen) return null

  const handleSave = () => {
    if (!institution.trim() || !major.trim() || !semester.trim()) return

    const payload = { university: institution, program: major, semester }

    if (education) {
      updateEducation(payload, { onSuccess: closeProfileModal })
    } else {
      createEducation(payload, { onSuccess: closeProfileModal })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={closeProfileModal} />
      <div className='relative w-full max-w-lg bg-white rounded-3xl p-6 flex flex-col gap-5 z-10'>

        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-800'>Edit Education Details</h2>
          <button onClick={closeProfileModal} className='text-gray-400 hover:text-gray-600 transition'>
            <X size={20} />
          </button>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Institution</label>
          <input
            type='text'
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder='e.g. SZABIST'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Major / Program</label>
          <input
            type='text'
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder='e.g. Computer Science'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Current Semester</label>
          <input
            type='text'
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder='e.g. 4th'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className='w-full bg-[#7a4f2a] text-white font-bold tracking-widest text-sm py-4 rounded-2xl hover:bg-[#6a3f1a] transition uppercase disabled:opacity-50'
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
    </div>
  )
}

export default ProfileModal