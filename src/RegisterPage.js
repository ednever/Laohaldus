import { useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import './style/Login.css';

function RegisterPage() {
  const auth = useContext(AuthContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function Register(username, email, password) {
    if (username.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      try {
        const response = await fetch('https://localhost:7011/Kasutaja/lisa/' + username + '/' + email + '/' + password, 
          { method: "POST", headers: { "Content-Type": "application/json" }}); 

        if (response.ok) {
          const json = await response.json(); 

          if (json === true) {  

            alert("Регистрация прошла успешно");

            usernameRef.current.value = "";
            emailRef.current.value = ""; 
            passwordRef.current.value = "";

          } else {
            alert("Такая почта уже используется");
          } 

        } else {
            console.error("Ошибка при получении почты Kasutaja:", response.status, response.statusText);        
        }


      } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
      } 

      

    } else {
      alert('Поля пусты или содержат только пробелы.');
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="logregh">Register</h2>
        <div id="form">
          <label className="logreglb" for="fullname">Full Name</label>
          <input className="logregin" ref={usernameRef} type="text" id="fullname" placeholder="Enter your full name" />

          <label className="logreglb" for="email">Email</label>
          <input className="logregin" ref={emailRef} type="email" id="email" placeholder="Enter your email" />

          <label className="logreglb" for="new-password">New Password</label>
          <input className="logregin" ref={passwordRef} type="password" id="new-password" placeholder="Enter your new password" />

          <button className="logregbut" type="submit" onClick={() => Register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)}>Register</button>
        </div>
        <div className="switch">Already have an account? <a href="login">Login here</a></div>
      </div>
    </div>
  );
}

export default RegisterPage;