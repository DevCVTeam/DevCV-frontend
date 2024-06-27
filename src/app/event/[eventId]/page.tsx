import { MdOutlineDateRange } from 'react-icons/md';
import AttendanceCheckIn from './_components/AttendanceCheckIn';

const EventIdPage = () => {
  return (
    <div className="mt-8">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-3xl font-semibold">
          취업에 관한 꿀팁 작성 시 포인트 지급
        </h2>
        <span className="flex items-center gap-2">
          <MdOutlineDateRange />
          24.04.01 ~ 24.04.30
        </span>
      </div>
      <hr className="my-12 w-full border" />
      <div>
        <AttendanceCheckIn />
      </div>
    </div>
  );
};

export default EventIdPage;
