import { useState, useEffect } from "react";

export const useUserFromLocalStorage = () => {
    const [user, setUser] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
            setUser(userFromLocalStorage);
            setAuth(true);
        }
    }, [user]);
    return auth;
};
