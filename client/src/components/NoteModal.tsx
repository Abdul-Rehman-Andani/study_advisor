import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { useModalStore } from '../store/modalStore'
import { useCreateNote } from '../hooks/notes/useCreateNote'

const types = ['PDF', 'IMAGE']

interface NoteModalProps {
  courseId: string
}

const NoteModal = ({ courseId }: NoteModalProps) => {
  const { noteModalOpen, closeNoteModal } = useModalStore()
  const { mutate: createNote, isPending } = useCreateNote()

  const [title, setTitle] = useState('')
  const [type, setType]   = useState('PDF')
  const [file, setFile]   = useState<File | null>(null)

  if (!noteModalOpen) return null

  const handleSave = () => {
    if (!title.trim() || !file) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('type', type)
    formData.append('courseId', courseId)
    formData.append('file', file)

    createNote(formData, {
      onSuccess: () => {
        setTitle('')
        setType('PDF')
        setFile(null)
        closeNoteModal()
      },
    })
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={closeNoteModal} />
      <div className='relative w-full max-w-lg bg-white rounded-3xl p-6 flex flex-col gap-5 z-10'>

        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-800'>Add New Note</h2>
          <button onClick={closeNoteModal} className='text-gray-400 hover:text-gray-600 transition'>
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Note Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. Lecture 1 Notes'
            className='w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-gray-400 outline-none'
          />
        </div>

        {/* Type */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Document Type</label>
          <div className='flex gap-2'>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold tracking-wide border transition ${
                  type === t
                    ? 'bg-[#7a4f2a] text-white border-[#7a4f2a]'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-[#7a4f2a]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-[11px] font-bold tracking-widest text-gray-400 uppercase'>Upload File</label>
          <label className='w-full bg-gray-100 rounded-xl px-4 py-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-200 transition border-2 border-dashed border-gray-200'>
            <Upload size={20} className='text-gray-400' />
            {file ? (
              <p className='text-sm text-[#7a4f2a] font-medium'>{file.name}</p>
            ) : (
              <p className='text-sm text-gray-400'>Click to upload PDF or Image</p>
            )}
            <input
              type='file'
              accept={type === 'PDF' ? '.pdf' : 'image/*'}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className='hidden'
            />
          </label>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={isPending || !file}
          className='w-full bg-[#7a4f2a] text-white font-bold tracking-widest text-sm py-4 rounded-2xl hover:bg-[#6a3f1a] transition uppercase disabled:opacity-50'
        >
          {isPending ? 'Uploading...' : 'Save Note'}
        </button>

      </div>
    </div>
  )
}

export default NoteModal