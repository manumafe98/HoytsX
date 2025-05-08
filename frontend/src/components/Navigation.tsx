import { NavigationArrow } from "@/icons";

interface NavigationProps {
  isOwner: boolean;
  showMenuIcon: boolean;
  handleNavigate: (path: string) => void;
  onNavigate: (section: string) => void;
  onClose?: () => void;
}

export const Navigation = ({
  isOwner,
  showMenuIcon,
  handleNavigate,
  onNavigate,
  onClose,
}: NavigationProps) => {
  const menuOptions = [
    {
      name: "Home",
      onclick: () => handleNavigate("/"),
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: true,
      shouldBeAvailableOnHome: false,
    },
    {
      name: "About us",
      onclick: () => {
        onNavigate("about");
        onClose();
      },
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: false,
      shouldBeAvailableOnHome: true,
    },
    {
      name: "Movies",
      onclick: () => {
        onNavigate("movies");
        onClose();
      },
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: false,
      shouldBeAvailableOnHome: true,
    },
    {
      name: "Admin",
      onclick: () => handleNavigate("/admin"),
      onlyOwner: true,
      shouldBeAvailableOPathsDifferentsThanHome: true,
      shouldBeAvailableOnHome: true,
    },
  ];

  const renderMenuItem = (option: (typeof menuOptions)[0], index: number) => {
    if (option.onlyOwner && !isOwner) return null;
    if (
      !option.shouldBeAvailableOPathsDifferentsThanHome &&
      location.pathname !== "/"
    )
      return null;
    if (!option.shouldBeAvailableOnHome && location.pathname === "/")
      return null;

    if (showMenuIcon) {
      return (
        <li
          key={index}
          className="group flex items-center justify-between border-b-1 border-solid border-white p-5 cursor-pointer"
          onClick={option.onclick}
        >
          <span className="text-white group-hover:text-primary">
            {option.name}
          </span>
          <NavigationArrow className="size-8 text-white group-hover:text-primary" />
        </li>
      );
    }

    return (
      <li
        key={index}
        className="hover:text-background-gradiant-end transform duration-200 cursor-pointer"
        onClick={option.onclick}
      >
        {option.name}
      </li>
    );
  };

  return (
    <ul
      className={
        showMenuIcon
          ? "flex flex-col gap-10 text-4xl mt-40 max-md:text-2xl max-md:mt-20 max-md:gap-5 max-sm:mt-5 max-sm:gap-2 p-5"
          : "flex text-xl text-white gap-5"
      }
    >
      {menuOptions.map(renderMenuItem)}
    </ul>
  );
};
