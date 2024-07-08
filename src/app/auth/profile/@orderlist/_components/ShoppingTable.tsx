'use client';

import { OrderStatus } from '@/utils/constant';
import { OrderListResponse } from '@/utils/type';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

const ShoppingTable: FC<OrderListResponse & { token: string }> = ({
  orderCount,
  memberId,
  orderList,
  token
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  return (
    <div className="flex flex-col gap-1">
      {orderCount !== 0 ? (
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <p className="min-w-[200px] font-semibold">
              주문번호 (이력서 제목)
            </p>
            <div className="grid grid-cols-3 gap-12 text-center">
              <p className="w-[100px]">상태(판매처)</p>
              <p className="w-[100px]">가격</p>
              <p className="w-[100px]">등록일자</p>
            </div>
          </div>

          <div>
            {orderList?.map((order) => (
              <Disclosure key={order.orderNumber}>
                {({ open }) => (
                  <div className="my-2 flex flex-col">
                    <DisclosureButton className="flex w-full cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200">
                      <p className="min-w-[200px] text-start font-semibold">
                        {order.orderNumber}
                      </p>
                      <div className="grid grid-cols-3 gap-12 text-center">
                        <p className="w-[100px]">
                          {OrderStatus[order.orderStatus]}
                        </p>
                        <p className="w-[100px]">
                          {order.totalPrice.toLocaleString()}원
                        </p>
                        <p className="w-[100px] text-gray-500">
                          {new Date(order.createdDate).toLocaleDateString(
                            'ko-KR'
                          )}
                        </p>
                      </div>
                    </DisclosureButton>
                    <div className="self-center">
                      {open ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
                    </div>
                    <DisclosurePanel className="rounded-xl bg-green-200 px-4 pb-2 pt-4">
                      {order.resumeList.map((resume) => (
                        <Link
                          href={`/auth/profile/orderResume/${order.orderNumber}`}
                          className="cursor-pointer"
                          key={resume.resumeId}
                          passHref
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-[200px]">
                              <p className="font-semibold">{resume.title}</p>
                              <p className="text-gray-500">
                                {resume.sellerEmail}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-12 text-center">
                              <p className="w-[100px]">
                                {resume.sellerNickname ?? '홍길동'}
                              </p>
                              <p className="w-[100px]">
                                {resume.price.toLocaleString()}원
                              </p>
                              <p className="w-[100px] text-gray-500">
                                {new Date(order.createdDate).toLocaleDateString(
                                  'ko-KR'
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      ) : (
        <div>구매한 이력서가 없습니다.</div>
      )}
    </div>
  );
};

export default ShoppingTable;
