import { useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import './style/Login.css';

function LoginPage() {
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function Testik(email, password) {
    if (email.trim() !== "" && password.trim() !== "") {
        try {
          const response = await fetch('https://localhost:7011/Kasutaja/kontroll/' + email + '/' + password);          
          if (response.ok) {
              const username = await response.text(); 

              if (username !== "") {      
                emailRef.current.value = ""; 
                passwordRef.current.value = "";   
                auth.login();
                auth.user(username, email);
                window.location.href = "http://localhost:3000/";
              } else {
                alert("Неправильная почта или пароль");
              } 

          } else {
              console.error("Ошибка при получении данных Toode:", response.status, response.statusText);        
          }
        } catch (error) {
          console.error("Произошла ошибка при запросе:", error);
        }           
    } else {
      alert('Поля пусты или содержат только пробелы.');
    }
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