import React from 'react'
import Link from 'next/link'

const Index = () => {
  return (
    <>
      <div>
        Index
      </div>
      <Link href="/about">
        <a>about</a>
      </Link>
    </>
  )
}

export default Index