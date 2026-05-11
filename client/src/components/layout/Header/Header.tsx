import { Link } from "react-router";

import { Nav } from "@/components/common/header/Nav";
import { Search } from "@/components/common/header/Search";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isMobile, current } = useBreakpoint();

  return (
    <header className="absolute top-0 left-0 w-full bg-(--background-secondary)">
      <div
        className={cn(
          "container m-auto py-3",
          isMobile
            ? "grid grid-cols-2 items-center gap-x-2 gap-y-3 px-3"
            : "flex items-center justify-between gap-4",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="shrink-0" />

          <h1 className="truncate">Shop</h1>
        </Link>

        <Search
          className={cn("col-span-2 min-w-0 w-full ", {
            "order-3": isMobile,
            "max-w-75": current === "sm",
            "max-w-111": current !== "sm",
            "max-w-135": current === "xl",
          })}
        />
        <div className="min-w-0 justify-self-end">
          <Nav />
        </div>
      </div>
    </header>
  );
};
