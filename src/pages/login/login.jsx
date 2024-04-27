import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

import { loginUser, setIsRememberAction } from "../Users/UserSlice";

export function LoginPage() {
  // Use the `useNavigate` hook to navigate to different pages
  const navigate = useNavigate();
  
  // State variables for email, password, and user information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, isRemember, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect to check if the user is already authenticated, and if so, redirect to the user page
  useEffect(() => {
    const storedToken  = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      console.log('Redirecting to /User');
      navigate('/User');
    }
  }, [token, navigate]);

  // Event handler for the login button
  const handleLoginEvent = (e) => {
    e.preventDefault();

    // Dispatch the action to set the "isRemember" state
    dispatch(setIsRememberAction(isRemember));

    // Prepare user credentials for login
    let userCredentials = {
      email,
      password,
      isRemember,
    };

    // Dispatch the loginUser async action
    dispatch(loginUser(userCredentials)).then((result) => {
      console.log('Login result:', result);

      // If login is successful, store the token in local or session storage based on "isRemember"
      if (result.payload && result.payload.token) {
        const token = result.payload.token;

        if (isRemember) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        // Redirect to the user page
        navigate('/User');
      }
      console.log('Login successful!');
    }).catch((err) => {
      console.error('Login error:', err);
    });
  };

  // Event handler for the "Remember me" checkbox
  const handleRememberChange = () => {
    dispatch(setIsRememberAction(!isRemember));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {/* User icon */}
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLoginEvent}>
          {/* Email input */}
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          {/* Password input */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {/* "Remember me" checkbox */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={isRemember}
              onChange={handleRememberChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Submit button */}
          <button type="submit" className="sign-in-button">
            {loading ? "Loading..." : "Sign In"}
          </button>

          {/* Display error message if there is an error */}
          {error && (
            <div className="alerte alerte-danger" role="alert">
              {"Email ou Password invalide"}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
