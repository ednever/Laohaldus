import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';

function NavigationPanel() {
    const auth = useContext(AuthContext);

    const [kategooriad, setKategooriad] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseKategooria = await fetch("https://localhost:7011/Kategooria");
                
                if (responseKategooria.ok) {
                    const json = await responseKategooria.json();
                    setKategooriad(json);         
                } else {
                    console.error("Ошибка при получении данных Kategooria:", responseKategooria.status, responseKategooria.statusText);        
                }

            } catch (error) {
                console.error("Произошла ошибка при запросе:", error);
            }
        }
    
        fetchData();
    }, []);
    
    return (        
        <nav id="navbar" className="nav">       
            <ul className="nav-list">
            <li className="left-item"><strong>Laohaldus</strong></li>
            <div className="centered-items">           
                <li><a href="/#welcome-section"><i className="fa fa-home fa-fw" aria-hidden="true"></i>Meiest</a></li>
                <li className="dropdown">
                <a href="/#projects">Kategooriad</a>
                <div className="dropdown-content">
                    {kategooriad.map((kategooria) => (<a href="tooted" onClick={() => localStorage.setItem('kategooriaId', kategooria.id)}>{kategooria.nimetus}</a>))}
                </div>
                </li>
                <li>
                {auth.isAuthenticated ? (
                    <a href="ostukorv">Ostukorv</a>
                    ) : (
                    null
                )}
                </li>
                <li>
                {auth.isAdmin === 'True' ? (
                    <a href="admin">Panel</a>
                    ) : (
                    null
                )}
                </li>
            </div>                    
            {auth.isAuthenticated ? (
                <li><button onClick={() => auth.logout()}>Sign out</button></li>
            ) : (
                <li><button onClick={() => window.location.href = "http://localhost:3000/login"}>Login</button></li>
            )}
            </ul>
        </nav>            
    );
}

export default NavigationPanel;