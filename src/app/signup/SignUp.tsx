import React from 'react'
import GoogleIcon from '../../components/Shared/Icons/Google.icon'
import { AppleIcon } from '@/components/Shared/Icons'
import { Mail } from 'react-feather'
import SocialButtons from './SocialButtons'

const SignUp = () => {
  return (
      <main className='pt-4 px-4'>
          <div className="mb-8 text-center">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight">Save your progress</h2>
              <div className="text-base text-base-content/80">Build a <strong className="text-base-content">Workout 💪</strong> habit and grow your garden!</div>
          </div>
          <div className="card bg-primary/35 max-w-xl mx-auto mb-8">
              <div className="card-body">
                  <SocialButtons />
                  <div className="divider py-4">
                      <span className="opacity-74">OR</span>
                  </div>
                  <div className='relative'>
                      <input type="checkbox" name="isEmail" id="isEmail" className='absolute top-0 left-0 peer w-full h-full z-10' />
                      <button className='btn btn-block peer-checked:hidden btn-primary' aria-label='Sign up with email'>
                          <Mail />
                          Sign up with email
                      </button>
                      
                  </div>
                  <div className="mt-3 text-xs opacity-75 text-center">
                      By signing up, you agree to our
                      <a className='link' href='/tos'>TOS</a>
                      &
                      <a className='link' href='/privacy-policy'>Privacy Policy</a>
                  </div>
              </div>
          </div>
          <div className="text-center font-medium mb-12">
              Already have an account?
              <a className='link' href='/login'>Log in</a>
          </div>

      </main>
  )
}

export default SignUp