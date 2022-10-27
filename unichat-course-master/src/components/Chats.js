// import some usefull hooks ,componets and contexts etc..
import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Chats() {
  // declare usefull hooks
  const didMountRef = useRef(false)
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // console.log(user)

  //  function handle to logout
  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  // function to get userPhoto via email
  async function getFile(url) {
    let response = await fetch(url);
    // blob function take document in binary form
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  // useEffect starts here
  useEffect(() => {


    if (!didMountRef.current) {
      didMountRef.current = true;

      // if user is logged then redirect to  login page 
      if (!user) {
        history.push('/');
        return
      }


      // axios call for api fetching chatEngine
      axios.get(
        'https://api.chatengine.io/users/me/',
        // get project id via env for security purpose
        {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid
          }
        }
      )
        .then(() => { setLoading(false); })
        .catch((e) => {
          // load user data to formdata on chat UI
          let formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);

          // call getFile functions
          getFile(user.photoURL)
            .then(avatar => {
              formdata.append('avatar', avatar, avatar.name)

              // axios post call
              axios.post(
                'https://api.chatengine.io/users',
                formdata,
                // private key provided by ChatEngine through process.Env
                { headers: { "private-key":process.env.REACT_APP_CHAT_ENGINE_KEY} }
              )
                .then(() => setLoading(false))
                .catch((error) => console.log(error.response))
            })
        })

    }
    // dependency list array
  }, [user, history])

  // if usser is not logged then return to empty div
  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">

          <span id='un-logo' className='chat-bk'> MIN</span>
          <span id='logo_I' className='chat-bk'>!</span>
          <span id='chat-logo' className='chat-bk'>CHAT</span>


        </div>
        {/* logout section here */}
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      {/* chat Engine inject here */}
      <ChatEngine
      // height through is view port
        height='calc(100vh-66px)'
        // project id of chatEngine.io thgough .env
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        // user name is users email to find it just search  by its email
        userName={user.email}
        userSecret={user.uid}
      />
    </div>

  );
}

