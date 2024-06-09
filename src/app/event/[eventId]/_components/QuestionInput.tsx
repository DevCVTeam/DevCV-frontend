'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { SubmitHandler, useForm } from 'react-hook-form';

type TInput = {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
};

const QuestionInput = () => {
  const temp: ('0' | '1' | '2' | '3' | '4' | '5' | '6')[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TInput>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<TInput> = (data) => {};
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        {temp.map((question, index) => (
          <div key={index} className={`flex flex-col gap-2`}>
            <Label htmlFor={question}>
              이력서 작성을 하기 위해 참고한 자료가 있나요?
            </Label>
            <Input {...register(question, { required: true })} id={question} />
          </div>
        ))}

        <Button type="submit" className="my-12 rounded-3xl">
          제출
        </Button>
      </form>
      <span className="pt-4">
        질문에 맞지 않는 대답을 할 시 불이익이 생길 수 있습니다.
      </span>
    </div>
  );
};

export default QuestionInput;
