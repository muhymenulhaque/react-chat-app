import * as React from "react";
import { Switch, Route } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";
import Chatroom from "../pages/chatroom";

/**
* The router is imported in app.jsx
*
* Our site just has two routes in it–Home and About
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/


const PageRouter = ({ isAuthenticated }) => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chatroom" component={() => isAuthenticated ? <Chatroom/> : (<></>)
      } />
      <Route path="/about" component={About} />
    </Switch>
);

export default PageRouter;