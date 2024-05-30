import React, { Suspense } from 'react'
import SigninForm from './SigninForm';

const SignIn = async () => {
  
  return (
    <div className='pt-20'>
      <div className="flex mb-8 items-center flex-col">
        <h2 className='mb-4 text-4xl font-extrabold tracking-tight'>
          Welcome back 👋
        </h2>
        <p className='text-base opacity-80'>Log in to save your activity and progress</p>
      </div>
      <div className="card bg-primary/4 border border-black/10 max-w-xl mx-auto mb-8 md:mb-12 ">
        <div className="card-body">
          <Suspense fallback={<>Loading...</>}>
            <SigninForm />
          </Suspense>
        </div>
      </div>
      <div className="text-center">Don't have an account? <a className="link" href="/signup">Sign up</a></div>
    </div>
  );
};

export default SignIn;
