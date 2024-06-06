'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const page = searchParams.get('page') || '1'

  const params = new URLSearchParams(searchParams)
  const ITEM_PER_PAGE = 5 //TO DO: Add scroll bar for select number of items per page (5, 10, 20, 50)

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count

  const handleChangePage = (type: string) => {
    type === 'prev'
      ? params.set('page', String(parseInt(page) - 1))
      : params.set('page', String(parseInt(page) + 1))
    replace(`${pathname}?${params}`)
  }
  return (
    <div className="p-2 flex justify-between">
      <button
        className="py-1 px-2 bg-background border border-input dark:border-muted rounded-lg hover:bg-muted cursor-pointer disabled:cursor-not-allowed"
        disabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </button>
      <button
        className="py-1 px-2 bg-background border border-input dark:border-muted rounded-lg hover:bg-muted cursor-pointer disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => handleChangePage('next')}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
