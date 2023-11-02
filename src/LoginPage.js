import { useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import './style/Login.css';

function LoginPage() {
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  function Testik(email, password) {
    emailRef.current.value = ""; 
    passwordRef.current.value = "";
    
    auth.login();
    window.location.href = "http://localhost:3000/"
  }

  return (   
    <div class="container">
      <div class="card">
        <h2 class="logregh">Login</h2>
        <div id="form">
          <label class="logreglb" for="email">Email</label>
          <input class="logregin" ref={emailRef} type="email" id="email" placeholder="Enter your email" />

          <label class="logreglb" for="password">Password</label>
          <input class="logregin" ref={passwordRef} type="password" id="password" placeholder="Enter your password" />

          <button class="logregbut" onClick={() => Testik(emailRef.current.value, passwordRef.current.value)}>Login</button>
        </div>
        <div class="switch">Don't have an account? <a href="register">Register here</a></div>
      </div>
    </div>
  );
}

export default LoginPage;