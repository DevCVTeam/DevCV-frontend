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
    <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default AttendanceCheckIn;
