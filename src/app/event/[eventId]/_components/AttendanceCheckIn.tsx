'use client';

import Lottie from 'react-lottie';
import animationdata from '../../../../../public/Attendance.json';
const AttendanceCheckIn = () => {
  const defaultOptions = {
    loop: 0,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default AttendanceCheckIn;
