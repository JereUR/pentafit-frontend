'use client'

import useActivities from '@/components/hooks/useActivities'
import React from 'react'

export default function ActivityForm() {
  const { addActivity } = useActivities()
  return (
    <div>
      <form action={addActivity}>
        <div className="flex flex-col gap-4 mb-[5vh]">
          <label htmlFor="email" className="text-xl font-extralight">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-transparent border rounded-md text-xl p-2 focus:outline-none"
          />
        </div>
      </form>
    </div>
  )
}
