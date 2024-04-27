import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Redux thunk to handle saving the user name
export const handleSaveUserName = createAsyncThunk(
  'user/saveUserName',

  async (newUserName, { dispatch, getState }) => {
    try {
      // Retrieve the authentication token from the Redux state
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      // Make a PUT request to update the user profile with the new user name
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Log success and reload the page
      console.log('User name updated successfully:', response.data);
      window.location.reload();

      // Return the response data if needed
      return response.data;
    } catch (error) {
      // Log and throw the error to reject the promise
      console.error('Error updating user name:', error);
      throw error;
    }
  }
);

function EditUserNameForm() {
  const dispatch = useDispatch();
  
  // Retrieve the authentication token from the Redux state
  const token = useSelector((state) => state.user.token);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);

  // State variable for the new user name
  const [userName, setUserName] = useState('');

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the handleSaveUserName async action
    dispatch(handleSaveUserName(userName))
      .then(() => {
        // Handle success if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          New Username:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          First Name :
          <input
            type="text"
            value={firstName}
            disabled  // This field is disabled
          />
        </label>
      </div>
      <div>
        <label>
          Last Name :
          <input
            type="text"
            value={lastName}
            disabled  // This field is disabled
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditUserNameForm;
