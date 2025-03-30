'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { MarkdownEditor } from '@/components/Markdown';
import { companyOptions, jobOptions, techstackOptions } from '@/utils/option';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoPlusCircle } from 'react-icons/go';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';
type TResumeRegister = {
  thumbnail: File[];
  resumefile: File;
  title: string;
  company: string;
  job: string;
  price: number;
  techstack: string;
  description: string;
};

// 이력서 등록
const ResumeRegister = () => {
  const { data: session } = useSession();

  const router = useRouter();
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
  const [boardColor, setBoardColor] = useState(false);
  const getPreviewSrc = (file: File | null) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const handleApproval = async (data: TResumeRegister) => {
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
      formData.append('images', file);
    });
    formData.append('resumeFile', resumeFile);

    const response = await axios.post('/server/resumes', formData);
    if (response.status !== 200) {
      return toast.error('이력서 등록에 실패했습니다.');
    }

    toast.success('이력서 등록에 성공했습니다.');

    return router.push('/auth/profile');
  };
  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handleApproval)}
        className="flex flex-col gap-12"
        encType="multipart/form-data"
      >
        <div className="mt-20 flex h-80 justify-start gap-40">
          <div className="flex flex-col">
            <Label htmlFor="thumbnail" className="mb-2">
              대표 이미지{' '}
              {errors.thumbnail && (
                <small role="alert" className="text-red-400">
                  ※{errors.thumbnail.message}※
                </small>
              )}
            </Label>
            <Controller
              name="thumbnail"
              control={control}
              rules={{ required: '썸네일 이미지를 등록해주세요' }}
              render={({ field }) => (
                <div className="relative flex size-80 rounded-2xl bg-subgray">
                  <Input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
                    }}
                    className="hidden" // 기본 파일 입력을 숨깁니다.
                  />
                  <Label
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
                        src={getPreviewSrc(thumbnail[0])!}
                        alt="미리보기"
                        width={800}
                        height={800}
                        className="rounded-2xl"
                      />
                    )}
                  </Label>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="resumefile">
              이력서 파일{' '}
              {errors.resumefile && (
                <small role="alert" className="text-red-400">
                  ※{errors.resumefile.message}※
                </small>
              )}
            </Label>
            <Controller
              name="resumefile"
              control={control}
              rules={{ required: '이력서 파일을 등록해주세요' }}
              render={({ field }) => (
                <div className="flex size-80 flex-col rounded-2xl bg-subgray">
                  <Input
                    type="file"
                    id="resumefile"
                    accept="image/*, .pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
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
                  {resumefile && (
                    <div className="mt-2 flex flex-col items-center justify-center">
                      <div className="mb-2 text-center">{resumefile.name}</div>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
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
                id="title"
                {...register('title', { required: '제목을 입력해주세요' })}
                placeholder="제목 입력"
              />
            </div>
            <div>
              <Label htmlFor="company">
                카테고리{' '}
                {(errors.company || errors.job) && (
                  <small role="alert" className="text-red-400">
                    ※카테고리를 작성해주세요※
                  </small>
                )}
              </Label>
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="company"
                  rules={{ required: '카테고리를 입력해주세요' }}
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
                  rules={{ required: '직무를 작성해주세요' }}
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
              <Label htmlFor="price">
                가격{' '}
                {errors.price && (
                  <small role="alert" className="text-red-400">
                    ※{errors.price.message}※
                  </small>
                )}
              </Label>
              <Input
                type="number"
                id="price"
                placeholder="가격 입력"
                {...register('price', { required: '가격을 입력해주세요' })}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
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
                className="w-full"
                options={techstackOptions}
                ref={ref}
                isMulti
                instanceId="long-value-select"
                value={techstackOptions.find(
                  (techstackOption) => techstackOption.value === value
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
        <hr />
        <div className="my-8">
          <Label htmlFor="description">
            이력서 설명{' '}
            {errors.description && (
              <small role="alert" className="text-red-400">
                ※{errors.description.message}※
              </small>
            )}
          </Label>
          <Controller
            control={control}
            name="description"
            rules={{ required: '이력서 설명을 작성해주세요' }}
            shouldUnregister={true}
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
                    // .post('/api/posts/image', formdata, { headers })
                    // .then(function (response) {
                    //   let { preview_image_url, error } = response.data;
                    //   if (error) {
                    //     alert('이미지 올리기 실패!');
                    //   }
                    //   value =
                    //     value +
                    //     '\n\n ![' +
                    //     files[0].name +
                    //     '](' +
                    //     preview_image_url +
                    //     ')';
                    // });
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
