import { Facebook } from "@/icons/Facebook";
import { Instagram } from "@/icons/Instagram";
import { X } from "@/icons/X";

export const Footer = () => {

  const icons = [
    {
      type: Instagram,
      size: "h-6 w-6",
    },
    {
      type: Facebook,
      size: "h-6 w-6",
    },
    {
      type: X,
      size: "h-5 w-5",
    },
  ];

  const information = [
    {
      text: `Copyright © ${new Date().getFullYear()} National Amusements Inc.`,
      isLink: false,
    },
    {
      text: "Privacy policies",
      isLink: true,
    },
    {
      text: "Book of complaints",
      isLink: true,
    },
  ];

  return (
    <div className="flex justify-between items-center bg-dark-background h-20 text-gray-500 mt-auto p-5">
      <h1 className="text-3xl font-bold">HoytsX</h1>
      <ul className="flex gap-2 max-xl:flex-col max-xl:gap-0 max-xl:items-center max-sm:hidden">
        {information.map((info, index) => (
          <li
            key={index}
            className={`${info.isLink ? "hover:underline hover:text-primary" : ""}`}
          >
            {info.text}
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-3">
        {icons.map((icon, index) => (
          <li key={index}>
            <icon.type
              className={`fill-current text-gray-500 ${icon.size} hover:text-primary`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
