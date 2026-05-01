import { useMediaQuery } from "react-responsive";

export const breakpoints = {
   sm: 640,
   md: 768,
   lg: 1024,
   xl: 1280,
};

export const useBreakpoint = () => {
   const isSm = useMediaQuery({ query: `(min-width: 640px)` });
   const isMd = useMediaQuery({ query: `(min-width: 768px)` });
   const isLg = useMediaQuery({ query: `(min-width: 1024px)` });
   const isXl = useMediaQuery({ query: `(min-width: 1280px)` });

   let current = "xs";

   if (isXl) current = "xl";
   else if (isLg) current = "lg";
   else if (isMd) current = "md";
   else if (isSm) current = "sm";

   return {
      current,
      isMobile: current === "xs",
      isTablet: current === "sm" || current === "md",
      isDesktop: current === "lg" || current === "xl",
   };
};