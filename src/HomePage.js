import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function HomePage(){
  const auth = useContext(AuthContext);

  return (
    <div className="App">
      <nav id="navbar" class="nav">       
        <ul class="nav-list">
          <li><a href="#welcome-section">Meiest</a></li>
          <li><a href="#projects">Tooted</a></li>          
          {auth.isAuthenticated ? (
            <li><a href="/" onClick={() => auth.logout()}>Sign out</a></li>
          ) : (
            <li><a href="login">Login</a></li>
          )}

        </ul>
      </nav>
      <section id="welcome-section" class="welcome-section">
        <h1>Laohaldussüsteem</h1>
        <p>Paremad tooted maailmas</p>
      </section>
      <section id="projects" class="projects-section">
        <h2 class="projects-section-header">Kategooriad</h2>
        <div class="projects-grid">
          <a href="https://codepen.io/freeCodeCamp/full/zNqgVx" target="_blank" class="project project-tile">
            <img class="project-image" src="https://cdn.freecodecamp.org/testable-projects-fcc/images/tribute.jpg" alt="project" />
            <p class="project-title"><span class="code">&lt;</span>Tribute Page<span class="code">&#47;&gt;</span></p>
          </a>          
        </div>
      </section>
    </div>
  );
};
  
export default HomePage;