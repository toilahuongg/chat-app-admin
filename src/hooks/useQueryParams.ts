import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useQueryParams = (_params: string[]) => {
  const router = useRouter();

  const params = useMemo(() => {
    const result = new URLSearchParams('');
    for (const param of _params) {
      if (router.query[param]) result.set(param, router.query[param] as string);
    }
    return result;
  }, [router.query, _params]);

  return useMemo(() => ({ params }), [params]);
};

export default useQueryParams;
