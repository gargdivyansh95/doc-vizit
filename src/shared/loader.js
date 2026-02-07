import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function Loader({height}) {
  return (
    <div className={`flex justify-center items-center ${height}`}>
        <LoaderIcon className="h-8 w-8 animate-spin text-brand-dark-green" />
    </div>
  )
}
