'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const DigitalCard = dynamic(() =>
  import('@/components/digital-card').then(module => module.DigitalCard),
)
export function SaveContact() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className='text-link' onClick={() => setOpen(true)}>
        Save contact card
      </button>
      {open && <DigitalCard open={open} onOpenChange={setOpen} />}
    </>
  )
}
