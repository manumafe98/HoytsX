import { Facebook, Instagram, X } from "@/icons";

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
      text: "Privacy policies",
      isLink: true,
    },
    {
      text: "Book of complaints",
      isLink: true,
    },
  ];

  return (
    <div className="flex justify-between items-center bg-dark-background min-h-20text-gray-500 mt-auto p-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">HoytsX</h1>
        <a
          href="https://manuelmaxera.com/"
          className="text-sm hover:underline hover:text-primary"
        >
          Built by Manuel Maxera
        </a>
      </div>
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
