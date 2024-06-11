'use client';

import { useRouter } from 'next/navigation';

const ProductsTable = () => {
  const router = useRouter();
  const data = [
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    },
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    },
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    },
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    },
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    },
    {
      name: '중소기업에서 비거주무기지',
      email: 'esthera@simmimple.com',
      category: '집단내',
      price: '1,900원',
      date: '14/06/21'
    }
  ];
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-3 gap-12 text-center">
          <p className="w-[100px]">판매처</p>
          <p className="w-[100px]">가격</p>
          <p className="w-[100px]">등록일자</p>
        </div>
      </div>

      {data.map((item, index) => (
        <div
          className="flex items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
          key={index}
        >
          <div className="flex items-center">
            <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
            <div>
              <p className="min-w-[200px] font-semibold">{item.name}</p>
              <p className="min-w-[150px] text-gray-500">{item.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-12 text-center">
            <p className="w-[100px]">{item.category}</p>
            <p className="w-[100px]">{item.price}</p>
            <p className="w-[100px] text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTable;
