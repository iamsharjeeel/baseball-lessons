'use client'

import { useEffect, useRef, useState } from 'react'
import { EvaluationForm } from './EvaluationForm'
import { useFormModal } from '../context/FormModalContext'

export function FormModal() {
  const { isOpen, closeModal } = useFormModal()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      setFormKey((key) => key + 1)
      dialog.showModal()
      closeButtonRef.current?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="form-modal-title"
      onClose={closeModal}
      className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-4 backdrop:bg-ink-black/80 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
    >
      <div className="relative w-full max-w-lg">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeModal}
          aria-label="Close form"
          className="absolute -top-12 right-0 flex min-h-11 min-w-11 items-center justify-center font-display text-2xl text-paper-white hover:text-accent"
        >
          ×
        </button>
        <h2 id="form-modal-title" className="sr-only">
          Book Your Free Evaluation
        </h2>
        <EvaluationForm key={formKey} variant="modal" />
      </div>
    </dialog>
  )
}
