'use client';
import React from 'react'
import GoogleIcon from '../../components/Shared/Icons/Google.icon'
import AppleIcon from '../../components/Shared/Icons/Apple.icon'
import { ArrowRight, Eye, EyeOff } from 'react-feather'

const Login = () => {
  return (
      <div className='pt-20'>
          <div className="flex mb-8 flex-col">
              <h2 className='mb-4 text-4xl font-extrabold tracking-tight'>
                  Welcome back 👋
              </h2>
              <p className='text-base opacity-80'>Log in to save your activity and progress</p>
          </div>
          <div className="card bg-base-100 max-w-xl mx-auto mb-8 md:mb-12 ">
              <div className="card-body">
                  <button className='btn btn-block bg-white text-black hover:bg-gray-100 hover:text-black !border-base-content/20 '>
                      <GoogleIcon />
                  </button>
                  <button className="btn btn-block bg-black text-white hover:bg-black/80 hover:text-white border-0 ">
                      <AppleIcon /> Sign in with Apple</button>
                  <div className="divider"><span className="opacity-75">OR</span></div>
                  <form action="#">
                      <div className="form-group">
                          <label htmlFor="email" className='label'>
                              <span className='label-text'>Email</span>
                          </label>
                          <input type="email" name='email' inputMode='email' autoComplete='username' autoCapitalize='none' placeholder='vote@vote.com' className='form-control w-full input input-bordered' />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password" className="label">
                              <span className='label-text'>Password</span>
                              <a href="/forgot-password" className="label-text-alt">Forgotten password?</a>
                          </label>
                          <div className="relative">
                              <input name="password" type="password" autoComplete="current-password" className="form-control w-full input input-bordered " value="" />
                              <span className="password-toggle-icon">
                                  <Eye />
                                  <EyeOff />
                              </span>
                          </div>
                      </div>
                      <div className="form-group pt-4">
                          <button type="submit" className="btn btn-block btn-primary ">Sign in<ArrowRight /></button>
                      </div>
                  </form>
              </div>
          </div>
          <div className="text-center">Don't have an account? <a className="link" href="/signup">Sign up</a></div>
      </div>
  )
}

export default Login