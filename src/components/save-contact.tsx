'use client'
import { useState } from 'react'
import { DigitalCard } from '@/components/digital-card'
export function SaveContact() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className='text-link' onClick={() => setOpen(true)}>
        Save contact card
      </button>
      <DigitalCard open={open} onOpenChange={setOpen} />
    </>
  )
}
