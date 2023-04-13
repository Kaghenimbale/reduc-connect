import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from '../store/users/userSlice';

import React from 'react';

const Users = () => {
  const { user, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <h1>...Loading</h1>;
  }
  if (error) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <ul>
      {user.users.results?.map((item) => {
        return <li key={item.id.value}>{item.email}</li>;
      })}
    </ul>
  );
};

export default Users;
