import { useState } from 'react';

export const useUserRole = () => {
  const [role, _setRole] = useState(localStorage.getItem('userRole') ?? '');
  
  const setRole = newUserRole => {
      _setRole(newUserRole);
    localStorage.setItem('userRole', newUserRole);
  }
  
  return { role, setRole };
};