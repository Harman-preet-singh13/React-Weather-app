import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, push, set,onValue, update, remove } from "firebase/database";

const UsersContext = createContext();


export const useUsers = () => useContext(UsersContext);


export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('active-users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = newUser => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  
  const deleteUser = userId => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  
  const toggleStatus = userId => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
      )
    );
  };

  return (
    <UsersContext.Provider value={{ users, addUser, deleteUser, toggleStatus }}>
      {children}
    </UsersContext.Provider>
  );
};
