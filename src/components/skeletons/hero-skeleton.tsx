import { Skeleton } from '@/components/ui/skeleton'

export default function HeroSkeleton() {
  return (
    <div className='flex flex-col items-start gap-6'>
      {/* Location badge skeleton - matches inline-flex items-center gap-2 rounded-full border px-3 py-1 */}
      <Skeleton className='h-7 w-56 rounded-full md:h-8' />

      {/* Title skeleton - matches text-4xl sm:text-5xl md:text-6xl (single line) */}
      <Skeleton className='h-10 w-full max-w-2xl sm:h-12 md:h-14' />

      {/* Description skeleton - matches text-xl sm:text-2xl */}
      <div className='w-full max-w-3xl space-y-2'>
        <Skeleton className='h-7 w-full sm:h-8' />
        <Skeleton className='h-7 w-full sm:h-8' />
        <Skeleton className='h-7 w-4/5 sm:h-8' />
      </div>

      {/* Secondary description skeleton - matches text-base */}
      <div className='w-full max-w-2xl space-y-2'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-3/4' />
      </div>

      {/* Buttons skeleton */}
      <div className='flex flex-wrap items-center gap-3 pt-2'>
        <Skeleton className='h-10 w-36 rounded-md' />
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>
    </div>
  )
}
