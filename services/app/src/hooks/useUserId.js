import { useState } from 'react';

export const useUserId = () => {
  const [userId, _setUserId] = useState(localStorage.getItem('userId') ?? '');
  
  const setUserId = newUserId => {
    _setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
  }
  
  return { userId, setUserId };
}