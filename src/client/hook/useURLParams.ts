'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

type ParamObject = Record<string, string>;

function useURLParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParamsRef = useRef<URLSearchParams>(undefined);

  useEffect(() => {
    currentParamsRef.current = new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  const setParams = useCallback(
    (params: ParamObject | ParamObject[]) => {
      const paramsArray = Array.isArray(params) ? params : [params];

      if (paramsArray.some((param) => typeof param !== 'object')) {
        throw new Error('Invalid params format');
      }

      const newParams = new URLSearchParams(currentParamsRef.current?.toString() || searchParams.toString());

      paramsArray.forEach((param) => {
        Object.entries(param).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            newParams.delete(key);
          } else {
            newParams.set(key, value);
          }
        });
      });

      const newParamsString = newParams.toString();
      const currentParamsString = currentParamsRef.current?.toString() || '';

      if (newParamsString !== currentParamsString) {
        const newURL = newParamsString ? `?${newParamsString}` : window.location.pathname;
        router.push(newURL);
      }
    },
    [router, searchParams]
  );

  const getParam = useCallback(
    (key: string): null | string => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getAllParams = useCallback((): ParamObject => {
    const params: ParamObject = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const deleteParams = useCallback(
    (keys: string | string[]) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      const newParams = new URLSearchParams(searchParams.toString());

      keysArray.forEach((key) => {
        newParams.delete(key);
      });

      const newParamsString = newParams.toString();
      const newURL = newParamsString ? `?${newParamsString}` : window.location.pathname;
      router.push(newURL);
    },
    [router, searchParams]
  );

  return {
    setParams,
    getParam,
    getAllParams,
    deleteParams,
  };
}

export { useURLParams };
