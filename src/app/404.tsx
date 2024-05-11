import { Suspense } from 'react'

export default function Page404() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Page404</div>
    </Suspense>
  )
}
