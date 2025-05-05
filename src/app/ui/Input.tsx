import { FC, InputHTMLAttributes } from 'react';

export const Input: FC<{ extra?: string } & InputHTMLAttributes<HTMLInputElement>> = ({
  extra,
  ...props
}) => {
  const getStyle = () => {
    switch (props.type) {
      case 'checkbox':
        return `rounded-[5px] px-4 accent-input py-2.5 w-5 h-5 ${extra}`;
      default:
        return `h-[45px] bg-input w-[300px] rounded-input px-4 py-2.5 ${extra}`;
    }
  };
  return <input {...props} className={getStyle()} />;
};
