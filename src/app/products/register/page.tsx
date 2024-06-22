'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { MarkdownEditor } from '@/components/Markdown';
import { companyOptions, jobOptions, teckstackOptions } from '@/utils/option';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoPlusCircle } from 'react-icons/go';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';
type TResumeRegister = {
  thumbnail: File | null;
  resumefile: File[] | null;
  title: string;
  company: string;
  job: string;
  career: string;
  price: number;
  activity: string;
  techstack: string;
  description: string;
};

// 이력서 등록
const ResumeRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<TResumeRegister>({ mode: 'onChange' });
  const thumbnail = watch('thumbnail');
  const resumefile = watch('resumefile');
  const getPreviewSrc = (file: File | null) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const handleApproval = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('모든 필드를 올바르게 입력해 주세요.');
      return;
    }
  };
  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handleApproval)}
        className="flex flex-col gap-12"
      >
        <div className="mt-20 flex h-80 justify-start gap-40">
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="mb-2">
              대표 이미지
            </label>
            <Controller
              name="thumbnail"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <div className="relative flex size-80 rounded-2xl bg-subgray">
                  <Input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                    className="hidden" // 기본 파일 입력을 숨깁니다.
                  />
                  <label
                    htmlFor="thumbnail"
                    className="absolute inset-0 flex size-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white transition"
                  >
                    {!thumbnail ? (
                      <GoPlusCircle
                        className="rounded-full bg-default"
                        size={100}
                      />
                    ) : (
                      <Image
                        src={getPreviewSrc(thumbnail)!}
                        alt="미리보기"
                        width={800}
                        height={800}
                        className="rounded-2xl"
                      />
                    )}
                  </label>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="resumefile">이력서 파일</Label>
            <Controller
              name="resumefile"
              control={control}
              defaultValue={undefined}
              rules={{ required: '작성해주세요' }}
              render={({ field }) => (
                <div className="flex size-80 flex-col rounded-2xl bg-subgray">
                  <Input
                    type="file"
                    id="resumefile"
                    accept="image/*, .pdf"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
                    }}
                    className="hidden" // 기본 파일 입력을 숨깁니다.
                  />
                  <label
                    htmlFor="resumefile"
                    className="flex size-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white transition"
                  >
                    <GoPlusCircle
                      className="rounded-full bg-default"
                      size={100}
                    />
                  </label>
                  {resumefile && resumefile.length > 0 && (
                    <div className="mt-2 flex flex-col items-center justify-center">
                      {resumefile.map((file, index) => (
                        <div key={index} className="mb-2 text-center">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="title">제목</Label>
              <Input
                type="text"
                id="title"
                {...register('title', { required: true })}
                placeholder="제목 입력"
              />
            </div>
            <div>
              <Label htmlFor="company">카테고리</Label>
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="company"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputId="company"
                      options={companyOptions}
                      instanceId="company-select"
                      className="w-56"
                      ref={ref}
                      value={companyOptions.find(
                        (companyOption) => companyOption.value === value
                      )}
                      onChange={(companyOption) =>
                        onChange(companyOption?.value)
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="job"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputId="job"
                      className="w-56"
                      instanceId="job-select"
                      options={jobOptions}
                      ref={ref}
                      value={jobOptions.find(
                        (jobOption) => jobOption.value === value
                      )}
                      onChange={(jobOption) => onChange(jobOption?.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="price">가격</Label>
              <Input
                type="text"
                id="price"
                placeholder="가격 입력"
                {...register('price', { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-20">
          <div className="w-2/4">
            <Label htmlFor="career">주요 경력</Label>
            <Controller
              control={control}
              name="career"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MarkdownEditor
                  height={300}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="w-2/4">
            <Label htmlFor="activity">활동 내역</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              name="activity"
              render={({ field: { onChange, value } }) => (
                <MarkdownEditor
                  height={300}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="teckstack">기술 스택</Label>
          <Controller
            control={control}
            name="techstack"
            shouldUnregister={true}
            render={({ field: { onChange, value, ref } }) => (
              <ReactSelect
                inputId="techstack"
                className="w-full"
                options={teckstackOptions}
                ref={ref}
                isMulti
                instanceId="long-value-select"
                value={teckstackOptions.find(
                  (teckstackOption) => teckstackOption.value === value
                )}
                onChange={(selectedOptions) =>
                  onChange(
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  )
                }
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="description">이력서 설명</Label>
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field: { onChange, value } }) => (
              <MarkdownEditor height={600} onChange={onChange} value={value} />
            )}
          />
        </div>
        <div className="my-12">
          <Button className="w-full" type="submit">
            승인 요청
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResumeRegister;
