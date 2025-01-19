import React from 'react'

export default function RecentRooms() {
  return (
    <div className='min-h-[40vw] flex flex-col border border-neutral-700 min-w-[25vw] rounded-md ml-12 mt-10'>
      <span className='text-lg font-semibold border-b border-neutral-900 py-2 pl-4'>Recently joined rooms <span className='opacity-35 tracking-widest'>...</span></span>
    </div>
  )
}
