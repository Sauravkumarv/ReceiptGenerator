import React, { Suspense } from 'react'

const LazyComponent = ({ children, fallback = <div>Loading...</div> }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export default LazyComponent