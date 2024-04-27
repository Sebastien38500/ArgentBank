import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token);
    }
  }, []);
  const [userToken, setUserToken] = useState(null);
  const login = (userToken) => {
    console.log("User logged in");
    setIsLoggedIn(true);
    setUserToken(userToken); // Stocker le token utilisateur
    localStorage.setItem("token", userToken); };

  const logout = () => {
    setIsLoggedIn(false);
    setUserToken(null); // Réinitialiser le token utilisateur
    localStorage.removeItem("token");
  };
    const getToken = () => {
      const userToken = localStorage.getItem("token");
      console.log("User token:", userToken);
      return userToken;
    };
    
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};