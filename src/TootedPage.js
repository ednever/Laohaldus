import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function TootedPage() {
    const auth = useContext(AuthContext);
    const [tooted, setTooted] = useState([]);
    const [kategooria, setKategooria] = useState("");

    const kategooriaId = localStorage.getItem('kategooriaId');
    const kogusRef = useRef();

    useEffect(() => {
        async function fetchData() {
            try {
                const responseTooted = await fetch("https://localhost:7011/Toode/kat/" + kategooriaId);
                const responseKategooria = await fetch("https://localhost:7011/Kategooria/" + kategooriaId);

                if (responseTooted.ok && responseKategooria.ok) 
                {
                    const json = await responseTooted.json();
                    setTooted(json);   
                    
                    const text = await responseKategooria.text();
                    setKategooria(text); 
                } 
                else 
                {
                    console.error("Ошибка при получении данных Toode:", responseTooted.status, responseTooted.statusText);  
                    console.error("Ошибка при получении данных Kategooria:", responseKategooria.status, responseKategooria.statusText);       
                }
    
            } catch (error) {
                console.error("Произошла ошибка при запросах:", error);
            }
        }
    
        fetchData();
    }, []);

    async function LisaToodeOstukorvi(toodeId, kogus) {
        if (kogus !== "" && kogus !== "0") {           
            try {
                alert('Товар добавлен в корзину');
                fetch('https://localhost:7011/Tellimus/lisa/' + toodeId + '/' + kogus + '/' + localStorage.getItem('email'), 
                    { method: "POST", headers: { "Content-Type": "application/json" }}); 

                document.getElementById(toodeId).value = ""; 
                document.getElementById(toodeId).disabled = true;
                document.getElementById('button' + toodeId).disabled = true;
                
            } catch (error) {
                console.error("Произошла ошибка при запросе:", error);
            } 
        } else {
            alert('Выберите количество товара');
        }
    }
    
    return (
        <div className='App'>
            <NavigationPanel />
            <section id="projects" className="projects-section">
                <h1 className="projects-section-header">{kategooria}</h1>
                
                {tooted.length > 0 ? (
                    <div className="test-grid">
                        {tooted.map((toode) => (
                            <div className="test" key={toode.id}>
                            <a href="toode" onClick={() => localStorage.setItem('toodeId', toode.id)} className="test-tile">
                                <img className="test-image" src={toode.pilt} alt="toode" />
                                <p className="project-title">{toode.nimetus}</p>                                                                
                                <div className="test-details">
                                    <p>Kogus: {toode.kogus} {toode.uhik}</p>
                                    <p>Hind: {toode.hind}€</p>
                                </div>
                            </a>
                            </div>                            
                        ))}
                    </div>                                      
                ) : (
                    <div className="projects-grid">
                        <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>                    
                )}                                      
            </section>       
        </div>
    );
}

export default TootedPage;