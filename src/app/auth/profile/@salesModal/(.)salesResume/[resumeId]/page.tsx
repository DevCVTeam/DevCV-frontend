'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { MarkdownEditor } from '@/components/Markdown';
import Modal from '@/components/Modal';
import { Company, Job } from '@/utils/constant';
import { companyOptions, jobOptions, teckstackOptions } from '@/utils/option';
import { Resume } from '@/utils/type';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';

type TResumeModified = {
  thumbnail: File[] | string[];
  resumefile: File | string;
  title: string;
  company: string;
  job: string;
  price: number;
  techstack: string;
  description: string;
};

export default function SalesResumeModal({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  const router = useRouter();
  const [boardColor, setBoardColor] = useState(false);
  const [resume, setResume] = useState<Resume>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<TResumeModified>({ mode: 'onChange' });
  const resumefile = watch('resumefile');
  const { data: user } = useSession();
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/server/members/${user?.user.memberId}/resumes/${resumeId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.user.accessToken}`
          }
        }
      );
      const data: Resume = await res.json();

      setResume(data);
    })();
  }, []);
  if (resume === undefined) return <div>loading...</div>;

  const handleRemove = async () => {
    try {
      const data = await fetch(
        `/server/members/${user?.user.memberId}/resumes/${resumeId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user?.user.accessToken}`
          }
        }
      );
      if (data.status < 300) {
        router.refresh();
        return toast.success('이력서 삭제되었습니다.');
      }
    } catch (error) {
      toast.error('이력서 삭제에 실패했습니다.');
    }
  };

  const handleModified = async (data: TResumeModified) => {
    try {
      const {
        company,
        description,
        job,
        price,
        resumefile: resumeFile,
        techstack,
        thumbnail: thumbnailImg,
        title
      } = data;
      if (Object.keys(errors).length > 0) {
        toast.error('모든 필드를 올바르게 입력해 주세요.');
        return;
      }
      const formData = new FormData();

      const resume = JSON.stringify({
        price,
        title,
        content: description,
        stack: techstack,
        category: {
          companyType: company,
          stackType: job
        }
      });
      const blob = new Blob([resume], { type: 'application/json' });
      formData.append('resume', blob);

      thumbnailImg.map((file) => {
        console.log(file);
        formData.append('images', file);
      });
      formData.append('resumeFile', resumeFile);

      const res = await fetch(
        `/server/members/${user?.user.memberId}/resumes/${resumeId}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${user?.user.accessToken}`
          }
        }
      );
      if (!res.ok) {
        return toast.error('수정에 실패하였습니다.');
      }

      toast.success('이력서가 수정되었습니다.');
      return router.back();
    } catch (error) {
      toast.error('수정에 실패하였습니다.');
    }
  };

  return (
    <Modal title="판매한 이력서" isOpen={true} className="sm:max-w-5xl">
      {/* 판매한 이력서를 넘겨서 확인하기 */}

      <form
        className="mt-6 flex flex-col gap-4 text-textColor"
        onSubmit={handleSubmit(handleModified)}
      >
        <div className="flex justify-between">
          <Label htmlFor="title">
            제목{' '}
            {errors.title && (
              <small role="alert" className="text-red-400">
                ※{errors.title.message}※
              </small>
            )}
          </Label>
          <Input
            type="text"
            className="w-3/4"
            defaultValue={resume.title}
            id="title"
            {...register('title', { required: '제목을 입력해주세요' })}
            placeholder="제목 입력"
          />
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <Label className="font-semibold" htmlFor="job">
            개발 직무
          </Label>
          <Controller
            control={control}
            name="job"
            rules={{ required: '직무를 작성해주세요' }}
            defaultValue={Job[resume?.category.stackType]}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputId="job"
                className="w-3/4"
                instanceId="job-select"
                options={jobOptions}
                ref={ref}
                value={jobOptions.find(
                  (jobOption) => jobOption.value === value
                )}
                defaultInputValue={value}
                onChange={(jobOption) => onChange(jobOption?.value)}
              />
            )}
          />
        </div>
        <hr className="w-full border" />

        <div className="flex justify-between">
          <span className="font-semibold">기업 종류</span>
          <Controller
            control={control}
            name="company"
            rules={{ required: '기업종류 선택해주세요' }}
            defaultValue={Company[resume?.category.companyType]}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputId="company"
                options={companyOptions}
                instanceId="company-select"
                className="w-3/4"
                ref={ref}
                value={companyOptions.find(
                  (companyOption) => companyOption.value === value
                )}
                defaultInputValue={value}
                onChange={(companyOption) => onChange(companyOption?.value)}
              />
            )}
          />
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <Label htmlFor="teckstack">
            기술 스택{' '}
            {errors.techstack && (
              <small role="alert" className="text-red-400">
                ※{errors.techstack.message}※
              </small>
            )}
          </Label>
          <Controller
            control={control}
            name="techstack"
            shouldUnregister={true}
            render={({ field: { onChange, value, ref } }) => (
              <ReactSelect
                inputId="techstack"
                className="w-3/4"
                options={teckstackOptions}
                ref={ref}
                isMulti
                instanceId="long-value-select"
                defaultValue={resume.stack
                  .map((stack) => {
                    const matchingOption = teckstackOptions.find(
                      (teck) => teck.value === stack
                    );
                    return matchingOption
                      ? {
                          value: matchingOption.value,
                          label: matchingOption.label
                        }
                      : null;
                  })
                  .filter(Boolean)}
                // defaultInputValue={resume.stack.join(', ')}
                onChange={(selectedOptions) =>
                  onChange(
                    selectedOptions
                      ? selectedOptions.map((option) => option?.value)
                      : []
                  )
                }
              />
            )}
          />
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">판매자 닉네임</span>
          <p className="w-3/4 ">{resume?.sellerNickname}</p>
        </div>

        <hr className="w-full border" />

        <div className="flex justify-between">
          <Label htmlFor="price">
            판매 가격{' '}
            {errors.price && (
              <small role="alert" className="text-red-400">
                ※{errors.price.message}※
              </small>
            )}
          </Label>
          <Input
            className="w-3/4"
            type="number"
            id="price"
            defaultValue={resume.price}
            placeholder="가격 입력"
            {...register('price', { required: '가격을 입력해주세요' })}
          />
        </div>

        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">합격 증빙자료</span>
          <div className="flex w-3/4 flex-col">
            <Controller
              name="thumbnail"
              control={control}
              rules={{ required: '썸네일 이미지를 등록해주세요' }}
              defaultValue={resume.imageList.map(
                (image) => image.resumeImgPath
              )}
              render={({ field }) => (
                <div className="flex flex-col gap-1 text-sky-500">
                  <Input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
                    }}
                  />
                  {field.value.map((imagePath, index) => (
                    <div
                      className="flex items-center justify-between gap-1 text-sky-500"
                      key={index}
                    >
                      <div className="flex items-center gap-1">
                        <FaCloudDownloadAlt />
                        <Link
                          href={
                            imagePath instanceof Blob
                              ? URL.createObjectURL(imagePath)
                              : imagePath
                          }
                          target="_blank"
                        >
                          {imagePath instanceof Blob
                            ? imagePath.name
                            : '제출한 이미지'}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedValue = [...field.value];
                          updatedValue.splice(index, 1);
                          field.onChange(updatedValue);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">이력서</span>

          <Controller
            name="resumefile"
            control={control}
            rules={{ required: '이력서 파일을 등록해주세요' }}
            defaultValue={resume.resumeFilePath}
            render={({ field }) => (
              <div className="flex w-3/4 flex-col rounded-2xl bg-subgray">
                <Input
                  type="file"
                  id="resumefile"
                  accept="image/*, .pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                  }}
                />

                {resumefile && (
                  <div className="flex w-3/4 items-center gap-1 text-sky-500">
                    <FaCloudDownloadAlt />
                    <Link
                      href={
                        resumefile instanceof Blob
                          ? URL.createObjectURL(resumefile)
                          : resumefile
                      }
                      target="_blank"
                    >
                      {resumefile instanceof Blob
                        ? resumefile.name
                        : '제출한 이력서'}
                    </Link>
                  </div>
                )}
              </div>
            )}
          />
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">설명</span>
          <div className="flex w-3/4">
            <Controller
              control={control}
              name="description"
              rules={{ required: '이력서 설명을 작성해주세요' }}
              shouldUnregister={true}
              defaultValue={resume.content}
              render={({ field: { onChange, value } }) => (
                <FileDrop
                  onDragOver={(event) => {
                    setBoardColor(true);
                  }}
                  onDragLeave={(event) => {
                    setBoardColor(false);
                  }}
                  onDrop={(files, event) => {
                    if (!files) return;
                    const formdata = new FormData();
                    formdata.append('content_image', files[0]);
                    const headers = { 'Content-Type': files[0].type };
                    if (files[0].size >= 5000000) {
                      alert('5MB 이상 파일은 업로드가 불가능합니다.');
                    } else if (
                      files[0].type == 'image/png' ||
                      files[0].type == 'image/jpeg' ||
                      files[0].type == 'image/jpg' ||
                      files[0].type == 'image/gif'
                    ) {
                      fetch('/api/upload', {
                        method: 'POST',
                        body: formdata
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                          let { preview_image_url, error } = data;
                          if (error) {
                            alert('이미지 올리기 실패!');
                          }
                          const newValue =
                            value +
                            '\n\n ![' +
                            files[0].name +
                            '](' +
                            preview_image_url +
                            ')';
                          onChange(newValue);
                        });
                    } else {
                      alert('png, jpg, jpeg,gif 파일이 아닙니다.');
                    }

                    setBoardColor(false);
                  }}
                >
                  <MarkdownEditor
                    height={600}
                    onChange={onChange}
                    value={value}
                    style={{
                      backgroundColor: boardColor ? '#adb5bd' : '#FFFFFF'
                    }}
                  />
                </FileDrop>
              )}
            />
          </div>
        </div>
        <div className="mt-20 flex justify-around">
          <Button
            className="bg-black text-white hover:bg-slate-800"
            onClick={handleRemove}
            type="button"
          >
            삭제하기
          </Button>
          <Button type="submit">수정하기</Button>
          <Button
            className="bg-slate-200 hover:bg-slate-400"
            type="button"
            onClick={() => router.back()}
          >
            취소하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
