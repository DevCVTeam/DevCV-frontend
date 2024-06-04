'use client';

import { createContext, useState } from 'react';
import React from 'react';

type SignupContextProps = {
  agreements: number;
  setAgreements: React.Dispatch<React.SetStateAction<number>>;
};

const defaultValues: SignupContextProps = {
  agreements: 0,
  setAgreements: () => {}
};

export const SignupContext = createContext<SignupContextProps>(defaultValues);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [agreements, setAgreements] = useState<number>(0);

  return (
    <SignupContext.Provider value={{ agreements, setAgreements }}>
      {children}
    </SignupContext.Provider>
  );
};
