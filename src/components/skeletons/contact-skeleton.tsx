import { Skeleton } from '@/components/ui/skeleton'

export default function ContactSkeleton() {
  return (
    <div className='space-y-0'>
      {/* Section badges */}
      <div className='mb-5 flex flex-wrap items-center gap-2'>
        <Skeleton className='h-5 w-20 rounded-full' />
        <Skeleton className='h-5 w-24 rounded-full' />
      </div>

      {/* Title skeleton - matches text-2xl sm:text-3xl lg:text-4xl */}
      <Skeleton className='h-8 w-48 sm:h-9 lg:h-10' />

      {/* Description skeleton - matches text-sm sm:text-base lg:text-[17px] */}
      <div className='mt-2 max-w-2xl space-y-2'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-4/5' />
      </div>

      {/* Contact form skeleton */}
      <div className='mt-6 grid gap-6 sm:gap-8'>
        <div className='overflow-hidden rounded-lg border'>
          {/* Card Header - matches CardHeader className='pb-1 sm:pb-2' */}
          <div className='border-b p-6 pb-1 sm:pb-2'>
            <Skeleton className='h-6 w-32 sm:h-7' />
          </div>

          {/* Card Content - matches grid gap-4 sm:gap-5 */}
          <div className='grid gap-4 p-6 sm:gap-5'>
            {/* Name and Email in 2 columns on md+ */}
            <div className='grid gap-4 sm:gap-5 md:grid-cols-2'>
              <div className='grid gap-1.5'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-11 w-full rounded-md' />
              </div>
              <div className='grid gap-1.5'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-11 w-full rounded-md' />
              </div>
            </div>

            {/* Message field - full width */}
            <div className='grid gap-1.5'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-32 w-full rounded-md' />
            </div>
          </div>

          {/* Card Footer - matches CardFooter className='pt-0' */}
          <div className='border-t p-6 pt-0'>
            <Skeleton className='h-10 w-full rounded-md sm:w-auto sm:min-w-[120px]' />
          </div>
        </div>
      </div>
    </div>
  )
}
