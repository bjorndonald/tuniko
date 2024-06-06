import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'react-feather'

const UpdatesPage = () => {
  return (
      <main className="min-h-screen py-[65px]">
          <div className='mx-auto max-w-xl px-4 flex flex-col'>
            <div>
                  <Link className='btn w-fit mb-1 flex text-sm gap-2 btn-ghost whitespace-nowrap' href={"/"}>
                      <ArrowLeft size={14} />
                      BACK
                  </Link>
            </div>
            <h2 className='font-extrabold tracking-tight text-4xl mb-12'>Tuniko Updates</h2>

            <h4 className='text-xl font-bold mb-4'>🚀 Tuniko is born • June 20th, 2024</h4>
            <div>After 2 months of development, the community translator is finally ready!</div>
            <ul className="ml-4">
                <li>- Create and translate corpus texts </li>
                <li>- Track your ability to translate</li>
                <li>- Grow a a database of digital unknown languages</li>
            </ul>
        </div>
      </main>
  )
}

export default UpdatesPage