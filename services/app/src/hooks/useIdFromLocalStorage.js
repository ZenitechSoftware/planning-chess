import { useState, useMemo, useEffect } from 'react';

export const useIdFromLocalStorage = () => {
  const [userId, setUserId] = useState('');
  const isIdInLocalStorage = useMemo(() => (!!localStorage.getItem('userId')), [userId]);

  useEffect(() => {
    if(isIdInLocalStorage) {
      setUserId(localStorage.getItem('userId'))
    }
  }, [userId])
  

  return [userId, isIdInLocalStorage, setUserId];
}