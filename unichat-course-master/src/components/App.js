import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats";
import Login from "./Login";


function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      {/* add Router */}
      <Router>
        {/* authentiction provider */}
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>  
      {/* <Test/>  */}
    </div>
  )
}

export default App
