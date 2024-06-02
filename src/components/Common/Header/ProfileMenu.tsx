
import { Session } from 'next-auth'
import {signOut} from '@/auth'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
    session: Session
}

const ProfileMenu = ({session}: Props) => {
  return (
      <form action={async () => {
          "use server"
          
          await signOut()
          
      }} className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-full p-1">
              <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={session.user.image}
                  alt={`${session.user.name}`}
              />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-background/80 border border-divider rounded-box w-52">
              <li><a><button>Log out</button></a></li>

          </ul>
      </form>
  )
}

export default ProfileMenu