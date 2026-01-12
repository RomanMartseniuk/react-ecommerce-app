import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export type QueryParams = Record<string, string | undefined>;

export const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: QueryParams = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const setQuery = useCallback(
    (newParams: QueryParams) => {
      const updated = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          updated.delete(key);
        } else {
          updated.set(key, value);
        }
      });
      setSearchParams(updated);
    },
    [searchParams, setSearchParams]
  );

  return { params, setQuery };
};
