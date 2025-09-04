import React, { useState, FormEvent } from 'react';
import { LoginStep } from '../types';
import InputField from './InputField';
import LogoIcon from './LogoIcon';

const LoginCard: React.FC = () => {
  const [step, setStep] = useState<LoginStep>(LoginStep.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimation = (nextStep: LoginStep) => {
      setIsAnimating(true);
      setTimeout(() => {
          setStep(nextStep);
          setError(null);
          setIsAnimating(false);
      }, 150);
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Enter an email or phone number');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Enter a valid email address');
        return;
    }
    handleAnimation(LoginStep.PASSWORD);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Enter your password');
      return;
    }
    console.log('Simulating login with:', { email, password });
    handleAnimation(LoginStep.SUCCESS);
  };
  
  const handleGoBack = () => {
    setPassword('');
    handleAnimation(LoginStep.EMAIL);
  }

  const renderContent = () => {
    switch (step) {
      case LoginStep.EMAIL:
        return (
          <form onSubmit={handleEmailSubmit} className="w-full" noValidate>
            <InputField
              id="email"
              type="email"
              label="Email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              autoFocus={true}
            />
            <div className="text-sm text-[#1a73e8] hover:underline cursor-pointer mt-3 font-medium">
              Forgot email?
            </div>
            <p className="text-gray-600 text-sm mt-10">
              Not your computer? Use Guest mode to sign in privately. 
              <a href="#" className="text-[#1a73e8] hover:underline font-medium ml-1">Learn more</a>
            </p>
            <div className="mt-10 flex justify-between items-center">
              <button type="button" className="text-[#1a73e8] hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors">
                Create account
              </button>
              <button
                type="submit"
                className="bg-[#1a73e8] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#1867cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </form>
        );
      case LoginStep.PASSWORD:
        return (
          <form onSubmit={handlePasswordSubmit} className="w-full" noValidate>
             <div className="mb-8">
                <button onClick={handleGoBack} type="button" className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    {email}
                </button>
             </div>
            <InputField
              id="password"
              type="password"
              label="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              autoFocus={true}
            />
            <div className="text-sm text-[#1a73e8] hover:underline cursor-pointer mt-3 font-medium">
              Forgot password?
            </div>
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="bg-[#1a73e8] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#1867cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </form>
        );
      case LoginStep.SUCCESS:
        return (
            <div className="text-center py-8">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-5 text-2xl font-normal text-gray-900">Login Successful!</h3>
                <p className="mt-2 text-base text-gray-600">
                    Welcome back, {email}!
                </p>
                <button
                    onClick={() => {
                        setEmail('');
                        setPassword('');
                        handleAnimation(LoginStep.EMAIL);
                    }}
                    className="mt-8 bg-[#1a73e8] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#1867cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition-colors duration-200"
                >
                    Sign out
                </button>
            </div>
        );
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center text-center">
        <LogoIcon />
        <h1 className="text-2xl font-normal text-gray-800 mt-4">
            {step === LoginStep.SUCCESS ? '' : 'Sign in'}
        </h1>
        {step !== LoginStep.SUCCESS && (
            <p className="text-gray-600 mt-2">
                {step === LoginStep.EMAIL ? 'to continue to Gmail' : `Welcome`}
            </p>
        )}
      </div>
      <div className={`mt-8 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default LoginCard;
