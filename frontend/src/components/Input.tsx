import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "placeholder" | "onChange"
  > {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  handleOnChange: (
    label: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const Input = ({
  label,
  type,
  placeholder,
  handleOnChange,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col w-[75%]">
      <label className="text-primary font-bold text-xl mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={(event) => handleOnChange(label, event)}
        {...rest}
      />
    </div>
  );
};
