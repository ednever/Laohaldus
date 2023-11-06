import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function HomePage(){
  //const auth = useContext(AuthContext);

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
      <NavigationPanel />
      <section id="welcome-section" class="welcome-section">
        <h1>Laohaldussüsteem</h1>
        <p>Paremad tooted maailmas</p>
      </section>
      <section id="projects" class="projects-section">
        <h2 class="projects-section-header">Kategooriad</h2>
        <div class="projects-grid">
        {kategooriad.map((kategooria) => (
        <a href="tooted" onClick={() => localStorage.setItem('kategooriaId', kategooria.id)} class="project project-tile">
            <img class="project-image" src={kategooria.pilt} alt="kategooria" />
            <p class="project-title"><span class="code">&lt;</span>{kategooria.nimetus}<span class="code">&#47;&gt;</span></p>
        </a> 
        ))}       
        </div>
      </section>
    </div>
  );
};
  
export default HomePage;