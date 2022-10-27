import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import "firebase/app";

import { auth } from '../firebase'
// import index from '../index.css'
import firebase from 'firebase/app';
const Login = () => {
    return (
        <div id='login-page'>
            <div id="login-card">
                <div id='heading'>
                    <div className="minichat">
                        Welcome to
                    </div>
                    <div className="logo-name">
                        <span id='un-logo' className='chat-bk'> min</span>
                        <span id='logo_I' className='chat-bk'>!</span>
                        <span id='chat-logo' className='chat-bk'>chat</span>
                    </div>
                </div>
                <div className="login-container">
                    <div className="login-button google"
                    // onClick sign with google with firebase authentication
                        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                        {/* '@ant-design/icons' */}
                        <GoogleOutlined /> Sign In with <b id='google-hover-color'>Google</b>
                    </div>
                    <br /><br />
                    <div className="login-button facebook"
                     // onClick sign with firebase with firebase authentication
                        onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                    >
                        {/* '@ant-design/icons' */}
                        <FacebookOutlined /> Sign In with facebook
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login