'use client';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;
