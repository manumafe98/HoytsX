interface MenuProps {
  onClick: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  return (
    <button
      className="
        relative w-10 h-10 flex flex-col justify-center items-center gap-1 cursor-pointer
        group 
      "
      onClick={onClick}
    >
      <span className="block w-8 h-1.5 bg-white rounded-full" />
      <span className="block w-6 h-1.5 bg-white transition-all duration-300 group-hover:w-8 rounded-full" />
    </button>
  );
};
