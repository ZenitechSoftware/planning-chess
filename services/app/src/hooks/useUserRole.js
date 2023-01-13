import { useState, useEffect } from 'react';

export const useUserRole = () => {
  const [role, _setRole] = useState(localStorage.getItem('userRole') ?? '');
  
  const setRole = newUserRole => {
      _setRole(newUserRole);
    localStorage.setItem('userRole', newUserRole);
  }

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('userRole');
    if (roleFromLocalStorage) {
      _setRole(roleFromLocalStorage);
    }
  });

  return { role, setRole };
};