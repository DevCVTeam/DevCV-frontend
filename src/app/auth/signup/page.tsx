'use client';

import { useContext } from 'react';
import { SignupContext } from './_components/SignupProvider';
import Agree from './_components/Agree';
import Begin from './_components/Begin';
import Success from './_components/Success';

const SignupPage = () => {
  const { agreements } = useContext(SignupContext);
  return (
    <div>
      {agreements === 0 ? <Agree /> : null}
      {agreements === 1 ? <Begin /> : null}
      {agreements === 2 ? <Success /> : null}
    </div>
  );
};

export default SignupPage;
