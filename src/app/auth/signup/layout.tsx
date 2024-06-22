'use client';

import React from 'react';
import Navigation from './_components/Navigation';
import { SignupProvider } from './_components/SignupProvider';

const SignupLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-16">
      <SignupProvider>
        <Navigation />
        {props.children}
      </SignupProvider>
    </div>
  );
};

export default SignupLayout;
