import { Skeleton } from '@/components/ui/skeleton'

export default function AboutSkeleton() {
  return (
    <div className='space-y-0'>
      {/* Title + chips */}
      <div className='mb-5 flex flex-wrap items-center gap-2'>
        <Skeleton className='h-5 w-16 rounded-full' />
      </div>

      {/* Title skeleton - matches text-3xl sm:text-4xl md:text-5xl */}
      <Skeleton className='h-9 w-48 sm:h-10 md:h-12' />

      {/* Headline skeleton - matches text-sm sm:text-base */}
      <div className='mt-3 max-w-3xl space-y-2'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-4/5' />
      </div>

      {/* Badges skeleton */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='h-6 w-28 rounded-full' />
        ))}
      </div>

      {/* Separator */}
      <div className='my-6'>
        <Skeleton className='h-px w-full' />
      </div>

      {/* Tech Stack skeleton */}
      <div className='space-y-4'>
        <Skeleton className='h-5 w-24' />
        <div className='grid gap-3 md:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='space-y-3 rounded-xl border p-3'>
              <Skeleton className='h-5 w-20' />
              <div className='flex flex-wrap gap-2'>
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className='h-6 w-20 rounded-full' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
