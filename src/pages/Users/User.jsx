import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";
import { useSelector, useDispatch } from 'react-redux';
import './User.scss'
import { lastName, firstName, error, user, token, isLogin, userName } from './UserSlice';
import { handleSaveUserName } from '../../components/form/form';
import AccountWrap from '../../components/AccountWrapper/AccountWrapper';
import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';

function UserPage() {
  // Hook to navigate to different pages
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage the edit user name form visibility
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  // Retrieve the authentication token from Redux state
  const token = useSelector((state) => state.user.token);

  // useEffect to check if the user is authenticated, redirect to login if not
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!storedToken) {
      navigate('/Login');
    }
  }, [token, navigate]);

  // Handler function for the "Edit" button to start editing user name
  const handleEditNameClick = () => {
    setIsEditingUserName(true);
  };

  // Select relevant user data from Redux state
  const firstName = useSelector((state) => state.user.firstName)
  const newUserName = useSelector((state) => state.user.userName)
  const lastName = useSelector((state) => state.user.lastName)

  return (
    <>
      {/* Main content of the User Page */}
      <main className="main bg-dark">

        {/* Header section with user's name and edit button */}
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName} !</h1>
          {isEditingUserName ? (
            <EditUserNameForm onSubmit={(newUserName) => dispatch(handleSaveUserName(newUserName, token))} />
          ) : (
            <EditButton onClick={handleEditNameClick} />
          )}
        </div>

        {/* Section for displaying user accounts */}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <AccountWrap
           title="Argent Bank Checking (x8349)"
           amount="$2,082.79"
           description="Available Balance"
           buttonText="View transactions" />
        </section>
        <section className="account">
          <AccountWrap 
           title="Argent Bank Savings (x6712)"
           amount="$10,928.42"
           description="Available Balance"
           buttonText="View transactions"/>
        </section>
        <section className="account">
          <AccountWrap
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
            buttonText="View transactions"
             />
        </section>
      </main>
    </>
  );
}

// Export the UserPage component as the default export
export default UserPage;
