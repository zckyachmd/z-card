import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsSkeleton() {
  return (
    <div className='space-y-0'>
      {/* Section badges */}
      <div className='mb-5 flex flex-wrap items-center gap-2'>
        <Skeleton className='h-5 w-20 rounded-full' />
        <Skeleton className='h-5 w-20 rounded-full' />
      </div>

      {/* Title and description */}
      <div className='flex items-end justify-between gap-3'>
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-8 w-48 sm:h-9' />
          <Skeleton className='h-5 w-full max-w-2xl' />
        </div>
        <div className='hidden gap-2 sm:flex'>
          <Skeleton className='h-10 w-10 rounded-md' />
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>
      </div>

      {/* Projects horizontal scroll skeleton */}
      <div className='mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='min-w-[280px] snap-start space-y-3 rounded-lg border p-4 sm:min-w-[320px]'
          >
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <div className='flex flex-wrap gap-2 pt-2'>
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className='h-5 w-20 rounded-full' />
              ))}
            </div>
            <div className='flex gap-2 pt-2'>
              <Skeleton className='h-8 w-24 rounded-md' />
              <Skeleton className='h-8 w-24 rounded-md' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
