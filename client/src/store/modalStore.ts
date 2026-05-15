import { create } from 'zustand'

interface ModalStore {
  taskModalOpen: boolean
  courseModalOpen: boolean
  plannerModalOpen: boolean
  noteModalOpen: boolean
  profileModalOpen: boolean
  openTaskModal: () => void
  closeTaskModal: () => void
  openCourseModal: () => void
  closeCourseModal: () => void
  openPlannerModal: () => void
  closePlannerModal: () => void
  openNoteModal: () => void
  closeNoteModal: () => void
  openProfileModal: () => void
  closeProfileModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  taskModalOpen: false,
  courseModalOpen: false,
  plannerModalOpen: false,
  noteModalOpen: false,
  profileModalOpen: false,
  openTaskModal: () => set({ taskModalOpen: true }),
  closeTaskModal: () => set({ taskModalOpen: false }),
  openCourseModal: () => set({ courseModalOpen: true }),
  closeCourseModal: () => set({ courseModalOpen: false }),
  openPlannerModal: () => set({ plannerModalOpen: true }),
  closePlannerModal: () => set({ plannerModalOpen: false }),
  openNoteModal: () => set({ noteModalOpen: true }),
  closeNoteModal: () => set({ noteModalOpen: false }),
  openProfileModal: () => set({ profileModalOpen: true }),
  closeProfileModal: () => set({ profileModalOpen: false }),
}))