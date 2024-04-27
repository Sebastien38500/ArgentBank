// Profile.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setLastName, setError, setUserName,setEmail } from './profileSlice'; 


import { userDatas } from '../../services/userDatas';


const Profile = () => {
  const dispatch = useDispatch();
  const { isRemember } = useSelector((state) => state.login);


  useEffect(() => {
    userDatas()
      .then((data) => {
        dispatch(setFirstName(data.body.firstName));
        dispatch(setLastName(data.body.lastName));
        dispatch(setUserName(data.body.userName));
        dispatch(setEmail(data.body.email));
        if (isRemember) {
          localStorage.setItem('firstName', data.body.firstName);
          
          localStorage.setItem('userName', data.body.userName);
          localStorage.setItem('lastName', data.body.lastName);
        } else {
          localStorage.removeItem('firstName');
          localStorage.removeItem('userName');
          localStorage.removeItem('lastName');
        }
      })
      .catch((error) => dispatch(setError(error.response?.data?.message || 'Unknown error')));
  }, [isRemember, dispatch]);

  return (
    <main className="main bg-dark">
     
    </main>
  );
};

export default Profile;
