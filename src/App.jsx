//PACKAGES 
import React, { useState } from 'react';
import { onSignIn } from './firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENTS
import ButtonAppBar from "./components/AppBar";
import Seo from './components/seo.jsx';
import Home from "./pages/home";
import About from "./pages/about";
import Chatroom from "./pages/chatroom";
import CreateLink from './pages/create-link';

//STYLES
import "./styles/styles.css";

//CONTEXTS
import { UserContext } from './context/user';




export default function App() {
  //USE CONTEXT HERE INSTEAD FOR CHATROOM

  //create userData state amd related functions
  const [userData, _setUserData] = useState({
    name: null,
    id: null,
    authed: false
  });

  const userDataRef = React.useRef(userData);
  const setUserData = (data) => {
    userDataRef.current.name = data.name;
    userDataRef.current.id = data.id;
    userDataRef.current.authed = data.authed;
    
    _setUserData(data);
  };
  

  // handling user login state on load
  React.useEffect(() => {
    onSignIn((user) => {      //when logged in
      let updatedUserData = {
        name: null,
        id: null,
        authed: false
      }
      let setUser = true;

      if (user !== undefined && user.displayName !== undefined) {
        updatedUserData = {
          name: user.displayName,
          id: user.uid,
          authed: true
        }
        
        if (updatedUserData.name !== userDataRef.current.name || updatedUserData.id !== userDataRef.current.id || updatedUserData.authed !== userDataRef.current.authed) {
          //console.log({updatedUserData, userData: userDataRef.current})
          setUser = true;
        }
          
      } 
      
      if (setUser) setUserData(updatedUserData);
    
    }, () => {   // when loged out
      setUserData({
        name: null,
        id: null,
        authed: false
      });
    
    })
  
  }, [])
  

  //DONT LOAD CHATROOM IF NOT LOADED!!!


  return (
    <BrowserRouter>
      <UserContext.Provider value={userData}>
        <Seo />
        <main role="main" className="wrapper">
          <div className="content">
            {/* <ButtonAppBar /> */}

            <Routes>
              <Route index element={<Home />}/>
              <Route path="chatroom" element={<Chatroom />} />
              <Route path="create-link" element={<CreateLink />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Home />}/>
            </Routes>
            
          </div>
          {/* {console.log(userData)} */}
        </main>
      </UserContext.Provider> 
    </BrowserRouter>
  );
}

