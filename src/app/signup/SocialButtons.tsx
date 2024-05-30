'use client';
import { AppleIcon, GoogleIcon } from '@/components/Shared/Icons'
import React from 'react'

const SocialButtons = () => {
  return (
    <>
          <button aria-label='Sign up with Google' className='btn btn-block bg-white text-black hover:bg-gray-100 hover:text-black !border-base-content/20 '>
              <GoogleIcon />
              Sign up with Google
          </button>
          <button aria-label='Sign up with Apple' className='btn btn-block bg-black text-white hover:bg-black/80 hover:text-white border-0 '>
              <AppleIcon />
              Sign up with Apple
          </button>
    </>
  )
}

export default SocialButtons