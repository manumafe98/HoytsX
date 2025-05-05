import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  handleOnChange: () => void;
}

export const Input = ({
  label,
  type,
  placeholder,
  handleOnChange,
}: InputProps) => {
  return (
    <div className="flex flex-col w-[75%]">
      <label className="text-primary font-bold text-xl mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={handleOnChange}
      />
    </div>
  );
};
