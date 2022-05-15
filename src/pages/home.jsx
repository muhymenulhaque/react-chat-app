// handle login and redirect
import React, { useContext } from "react";
import { signIn, setDisplayName, signOutUser} from "../firebase";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/user";

const Home = () => {
  const [name, setName] = React.useState();
  
  const userData = useContext(UserContext);

  let handleSignIn = () => {
    if (name !== '') { 
      signIn()
      .then(() => {
        setDisplayName(name)
        // .then(() => navigate("/chatroom"))
      })
    }
  }

  const loginPage = (
    <>
      <input type="text" placeholder="Name" value={name} onChange={(e) => {
        setName(e.target.value);
      }} />
      <button onClick={handleSignIn}>Sign In</button>
    </>
  );

  
  
  return (
    <>
      { userData.authed ? <Navigate replace to="/chatroom"/> : loginPage }
    </>
  );

};

export default Home;
