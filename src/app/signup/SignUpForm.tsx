'use client';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { CreateUserInput, createUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRight, Eye, EyeOff } from 'react-feather';
import cx from 'classnames'

const SignUpForm = () => {
    
    const [submitting, setSubmitting] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)

    const methods = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
        try {
            setSubmitting(true);
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();

                if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                    errorData.errors.forEach((error: any) => {
                        toast.error(error.message);
                    });

                    return;
                }

                toast.error(errorData.message);
                return;
            }

            signIn(undefined, { callbackUrl: '/' });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };
  return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
              <label htmlFor="name" className='label'>
                  <span className='label-text'>Name</span>
              </label>
              <input type="name" {...register('name')} name='name' autoComplete='name' autoCapitalize='none' placeholder='Your name' className='form-control w-full input input-bordered' />
              {errors['name'] && (
                  <span className='text-red-500 text-xs pt-1 block'>
                      {errors['name']?.message as string}
                  </span>
              )}
          </div>
          <div className="form-group">
              <label htmlFor="email" className='label'>
                  <span className='label-text'>Email</span>
              </label>
              <input type="email" {...register('email')} name='email' inputMode='email' autoComplete='username' autoCapitalize='none' placeholder='vote@vote.com' className='form-control w-full input input-bordered' />
              {errors['email'] && (
                  <span className='text-red-500 text-xs pt-1 block'>
                      {errors['email']?.message as string}
                  </span>
              )}
          </div>
          <div className="form-group">
              <label htmlFor="password" className="label">
                  <span className='label-text'>Password</span>
              </label>
              <div className="relative">
                  <input name="password" {...register('password')} type={passwordVisible ? "text" : "password"} 
                      placeholder='Enter Password' autoComplete="current-password" className="form-control w-full input input-bordered " value="" />
                  <span onClick={() => setPasswordVisible(!passwordVisible)} className="btn btn-circle btn-ghost p-2 password-toggle-icon">
                      {passwordVisible ? <Eye /> : <EyeOff />}
                  </span>
              </div>
              {errors['password'] && (
                  <span className='text-red-500 text-xs pt-1 block'>
                      {errors['password']?.message as string}
                  </span>
              )}
          </div>
          <div className="form-group">
              <label htmlFor="password" className="label">
                  <span className='label-text'>Confirm Password</span>
              </label>
              <div className="relative">
                  <input {...register('passwordConfirm')} type={confirmVisible ? "text" : "password"}
                  placeholder='Confirm Password'  
                  className="form-control w-full input input-bordered"/>
                  <span onClick={() => setConfirmVisible(!confirmVisible)} className="btn btn-circle btn-ghost p-2 password-toggle-icon">
                      {confirmVisible ? <Eye /> : <EyeOff />}
                  </span>
              </div>
              {errors['passwordConfirm'] && (
                  <span className='text-red-500 text-xs pt-1 block'>
                      {errors['passwordConfirm']?.message as string}
                  </span>
              )}
          </div>
          <div className="form-group pt-4">
              <button type="submit" className={cx("inline-block px-7 py-4 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full", submitting && '!bg-gray-500')}
                  disabled={submitting}
              >
                  {submitting ? 'loading...' : <>Sign up<ArrowRight /></>}
              </button>
          </div>
    </form>
  )
}

export default SignUpForm