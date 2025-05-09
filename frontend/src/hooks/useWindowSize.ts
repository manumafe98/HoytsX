import { useEffect, useState } from "react";

export function useWindowSize(minWidth: number) {
  const [showMenuIcon, setShowMenuIcon] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowMenuIcon(window.innerWidth <= minWidth);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return showMenuIcon;
}
