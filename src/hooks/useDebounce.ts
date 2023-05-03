import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number, callback?: () => void) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
  return debouncedValue;
}

export default useDebounce;
