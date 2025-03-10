import { Facebook } from "@/icons/Facebook";
import { Instagram } from "@/icons/Instagram";
import { X } from "@/icons/X";

export const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-[#121313] h-20 text-gray-500 mt-auto p-5">
      <h1 className="text-3xl font-bold">HoytsX</h1>
      <ul className="flex gap-2">
        <li>
          Copyright © {new Date().getFullYear()} National Amusements Inc. |
        </li>
        <li className="hover:underline hover:text-[#9b2b66]">
          Privacy policies |
        </li>
        <li className="hover:underline hover:text-[#9b2b66]">
          Book of complaints
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>
          <Instagram className="fill-current text-gray-500 h-6 w-6 hover:text-[#9b2b66]" />
        </li>
        <li>
          <Facebook className="fill-current text-gray-500 h-6 w-6 hover:text-[#9b2b66]" />
        </li>
        <li>
          <X className="fill-current text-gray-500 h-5 w-5 hover:text-[#9b2b66]" />
        </li>
      </ul>
    </div>
  );
};
