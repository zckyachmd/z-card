import * as React from 'react'

type SectionProps = {
  id: string
  children: React.ReactNode
  className?: string
  full?: boolean
}

export default function Section({ id, children, className = '', full = false }: SectionProps) {
  // Generate accessible label from id
  const ariaLabel = id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative isolate scroll-mt-24 overflow-hidden lg:snap-start ${full ? 'grid min-h-[calc(100svh-5.5rem)] place-items-center sm:min-h-[calc(100svh-6rem)] md:min-h-[calc(100svh-7rem)] lg:min-h-[calc(100svh-7.5rem)]' : ''} ${className}`}
    >
      <div
        className={`mx-auto max-w-5xl ${full ? 'px-8 py-0 md:px-10' : 'px-6 pt-2 pb-10 md:pt-4 md:pb-12'}`}
      >
        {children}
      </div>
    </section>
  )
}
