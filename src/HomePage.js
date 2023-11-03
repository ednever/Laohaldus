import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function HomePage(){
  const auth = useContext(AuthContext);

  const [kategooriad, setKategooriad] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseKategooria = await fetch("https://localhost:7011/Kategooria");
        
        if (responseKategooria.ok) 
        {
          const json = await responseKategooria.json();
          setKategooriad(json);         
        } 
        else 
        {
          console.error("Ошибка при получении данных Kategooria:", responseKategooria.status, responseKategooria.statusText);        
        }

      } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
      }
    }
  
    fetchData();
  }, []);


  return (
    <div className="App">
      <nav id="navbar" class="nav">       
        <ul class="nav-list">
          <li class="left-item"><strong>Laohaldus</strong></li>
          <div class="centered-items">           
            <li><a href="#welcome-section">Meiest</a></li>
            <li class="dropdown">
              <a href="#projects">Kategooriad</a>
              <div class="dropdown-content">
                {kategooriad.map((kategooria) => (<a href="kategooriad">{kategooria.nimetus}</a>))}
              </div>
            </li>
            <li><a href="#projects">Tooted</a></li>
          </div>                    
          {auth.isAuthenticated ? (
            <li><button onClick={() => auth.logout()}>Sign out</button></li>
          ) : (
            <li><button onClick={() => window.location.href = "http://localhost:3000/login"}>Login</button></li>
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
        {kategooriad.map((kategooria) => (
        <a href="kategooriad" target="_blank" class="project project-tile">
            <img class="project-image" src="https://tsenter.ee/wp-content/uploads/2018/05/a-6.jpg" alt="kategooria" />
            <p class="project-title"><span class="code">&lt;</span>{kategooria.nimetus}<span class="code">&#47;&gt;</span></p>
        </a> 
        ))}       
        </div>
      </section>
    </div>
  );
};
  
export default HomePage;