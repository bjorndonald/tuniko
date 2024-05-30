'use client';
import { AppleIcon, GoogleIcon } from '@/components/Shared/Icons'
import React, { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Twitter } from 'react-feather'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import toast from 'react-hot-toast';
import cx from 'classnames'

const SigninForm = () => {
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false)
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';

    const methods = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
        try {
            setSubmitting(true);

            const res = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                redirectTo: callbackUrl,
            });

            setSubmitting(false);

            if (!res?.error) {
                toast.success('successfully logged in');
                router.push(callbackUrl);
            } else {
                reset({ password: '' });
                const message = 'invalid email or password';
                toast.error(message);
                setError(message);
            }
        } catch (error: any) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <button onClick={() => signIn('google', { callbackUrl })} className='btn btn-block bg-white text-black hover:text-white hover:bg-primary !border-base-content/20 '>
                <GoogleIcon /> Sign in with Google
            </button>
            <button onClick={() => signIn('twitter', { callbackUrl })} className="btn btn-block bg-black text-white hover:bg-black/80 hover:text-white border-0 ">
                <Twitter /> Sign in with Twitter</button>
            <div className="divider">
                <span className="opacity-75">OR</span>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                {error && (
                    <p className='text-center bg-red-300 py-4 mb-6 rounded'>{error}</p>
                )}
                <div className="form-group">
                    <label htmlFor="email" className='label'>
                        <span className='label-text'>Email</span>
                    </label>
                    <input type="email" {...register('email')} name='email' inputMode='email' autoComplete='username' autoCapitalize='none' placeholder='vote@vote.com' className='form-control w-full input  input-bordered' />
                    {errors['email'] && (
                        <span className='text-red-500 text-xs pt-1 block'>
                            {errors['email']?.message as string}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <div  className="label">
                        <span className='label-text'>Password</span>
                        <a href="/forgot-password" className="label-text-alt">Forgotten password?</a>
                    </div>
                    <label htmlFor="password" className="w-full input input-bordered flex items-center gap-2">
                        <input name="password" {...register('password')} type={passwordVisible ? "text" : "password"} autoComplete="current-password" className=" grow" value="" />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className="btn btn-circle btn-ghost p-2 password-toggle-icon">
                            {passwordVisible ? <Eye /> : <EyeOff />}
                        </span>
                    </label>
                    {errors['password'] && (
                        <span className='text-red-500 text-xs pt-1 block'>
                            {errors['password']?.message as string}
                        </span>
                    )}
                </div>
                <div className="form-group pt-4">
                    <button type="submit" className={cx("btn inline-flex px-7  bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md items-center gap-2 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full", submitting && '!bg-gray-500')}
                        disabled={submitting}
                    >
                        {submitting ? 'loading...' : <>Sign in<ArrowRight size={10} /></>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default SigninForm