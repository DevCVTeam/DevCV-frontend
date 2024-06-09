import EventList from './_components/EventList';
import ResumeList from './_components/ResumeList';

// Modal 창 띄우기
const Admin = () => {
  return (
    <div className="flex flex-col gap-32">
      <div className="mt-12">
        <h2 className="mb-4 text-3xl font-semibold">이벤트 목록</h2>
        <EventList />
      </div>
      <div className="">
        <h2 className="mb-4 text-3xl font-semibold">이력서 신청 목록</h2>
        <ResumeList type="apply" />
      </div>
      <div>
        <h2 className="text-3xl font-semibold">이력서 수정 신청 목록</h2>
        <ResumeList type="modify" />
      </div>
    </div>
  );
};

export default Admin;
