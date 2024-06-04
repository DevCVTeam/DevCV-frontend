'use client';

import React, { useContext } from 'react';
import { SignupProvider } from './_components/SignupProvider';
import Navigation from './_components/Navigation';

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
