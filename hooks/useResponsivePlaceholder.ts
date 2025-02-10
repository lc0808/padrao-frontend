import { useState, useEffect } from "react";

export const useResponsivePlaceholder = (
  desktopPlaceholder: string,
  mobilePlaceholder: string
) => {
  const [placeholder, setPlaceholder] = useState(desktopPlaceholder);

  useEffect(() => {
    const updatePlaceholder = () => {
      setPlaceholder(
        window.innerWidth < 640 ? mobilePlaceholder : desktopPlaceholder
      );
    };

    updatePlaceholder();

    window.addEventListener("resize", updatePlaceholder);
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, [desktopPlaceholder, mobilePlaceholder]);

  return placeholder;
};
