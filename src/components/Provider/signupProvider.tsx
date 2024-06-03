'use client';

import React, { useState } from 'react';
import { SignupContext } from '../Context/singupContext';

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [agreements, setAgreements] = useState<boolean[]>([false, false]);

  return (
    <SignupContext.Provider value={{ agreements, setAgreements }}>
      {children}
    </SignupContext.Provider>
  );
};
