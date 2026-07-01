'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type FormModalContextValue = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const FormModalContext = createContext<FormModalContextValue | null>(null)

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  )

  return <FormModalContext.Provider value={value}>{children}</FormModalContext.Provider>
}

export function useFormModal(): FormModalContextValue {
  const ctx = useContext(FormModalContext)
  if (!ctx) {
    throw new Error('useFormModal must be used within FormModalProvider')
  }
  return ctx
}
