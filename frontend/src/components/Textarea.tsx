import { ChangeEvent } from "react";

interface TextareaProps {
  label: string;
  handleOnChange: (
    label: string,
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const Textarea = ({ label, handleOnChange }: TextareaProps) => {
  return (
    <div className="flex flex-col w-[75%]">
      <label className="text-primary font-bold text-xl mb-1">{label}</label>
      <textarea
        name="description"
        className="bg-white resize-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        rows={4}
        onChange={(event) => handleOnChange(label, event)}
      />
    </div>
  );
};
