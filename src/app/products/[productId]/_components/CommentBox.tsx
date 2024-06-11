'use client';
import { CiHeart } from 'react-icons/ci';
const CommentBox = () => {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <div className="flex justify-between">
        <div className="flex gap-2 ">
          <span className="font-semibold">Name</span>
          <div>icon</div>
          <div>4.5</div>
        </div>
        <div className="flex gap-2 text-default">
          <div>수정</div>
          <div>삭제</div>
        </div>
      </div>

      <div>
        JPA강의나 다른 강의에서도 느낀점이지만, 인트로에서 항상 [안녕하세요]라고
        밝은 모습으로 힘차게 강의의 방향성을 설명하면서 시작하시는 점이 정말
        좋습니다. 이유는 알 수 없지만, 항상 강의 인트로를 보면 프로그래밍을 처음
        배웠을 대학교 시절의 설레임과 떨림이 생겨서 좋더라구요. 아마 좋은 강의를
        제공해주시기 때문에 오늘은 어떤 내용을 새로 배울까?라는 기대감과
        설레임이 저도 모르게 생겨서가 아닐까합니다. 그만큼 강의는 언제나
        최고입니다. 앞으로의 강의도 기대하겠습니다. 좋은 강의 감사합니다.
      </div>
      <div className="flex justify-between text-default">
        <span>2022.08.10</span>
        <div className="flex items-center">
          <CiHeart />
          45
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
