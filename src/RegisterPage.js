import { useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import './style/Login.css';

function RegisterPage() {
  const auth = useContext(AuthContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function Register(username, email, password) {
    //window.location.href = "http://localhost:3000/"

    usernameRef.current.value = "";
    emailRef.current.value = ""; 
    passwordRef.current.value = "";
  }

  return (
    <div class="container">
      <div class="card">
        <h2 class="logregh">Register</h2>
        <div id="form">
          <label class="logreglb" for="fullname">Full Name</label>
          <input class="logregin" ref={usernameRef} type="text" id="fullname" placeholder="Enter your full name" />

          <label class="logreglb" for="email">Email</label>
          <input class="logregin" ref={emailRef} type="email" id="email" placeholder="Enter your email" />

          <label class="logreglb" for="new-password">New Password</label>
          <input class="logregin" ref={passwordRef} type="password" id="new-password" placeholder="Enter your new password" />

          <button class="logregbut" type="submit" onClick={() => Register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)}>Register</button>
        </div>
        <div class="switch">Already have an account? <a href="login">Login here</a></div>
      </div>
    </div>
  );
}

export default RegisterPage;