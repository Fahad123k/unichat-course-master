import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Chats() {
  const didMountRef = useRef(false)
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // console.log(user)

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {


    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user) {
        history.push('/');
        return
      }


      axios.get(
        'https://api.chatengine.io/users/me/',
        {
          headers: {
            "project-id": "e1eb4670-5357-4237-951b-e45600a6d887",
            "user-name": user.email,
            "user-secret": user.uid
          }
        }
      )
        .then(() => { setLoading(false); })
        .catch((e) => {
          let formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);

          getFile(user.photoURL)
            .then(avatar => {
              formdata.append('avatar', avatar, avatar.name)

              axios.post(
                'https://api.chatengine.io/users',
                formdata,
                { headers: { "private-key": "83fac111-15ac-423f-a4e1-62d4bf7ff4a6" } }
              )
                .then(() => setLoading(false))
                .catch((error) => console.log(error.response))
            })
        })

    }
  }, [user, history])

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">

          <span id='un-logo' className='chat-bk'> MIN</span>
          <span id='logo_I' className='chat-bk'>!</span>
          <span id='chat-logo' className='chat-bk'>CHAT</span>


        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh-66px)'
        projectID='e1eb4670-5357-4237-951b-e45600a6d887'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>

  );
}

