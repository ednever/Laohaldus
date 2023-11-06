import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';

function TootedPage() {
    const auth = useContext(AuthContext);
    const [tooted, setTooted] = useState([]);
    const [kategooria, setKategooria] = useState("");

    const kategooriaId = localStorage.getItem('kategooriaId');
    const kogusRef = useRef();

    useEffect(() => {
        async function fetchData() {
            try {
                const responseTooted = await fetch("https://localhost:7011/Toode/" + kategooriaId);
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
        if (kogus !== "" && kogus !== 0) {
            alert('крут');
            /*try {
                const response = await fetch('https://localhost:7011/Tellimus/lisa/' + toodeId + '/' + kogus, 
                    { method: "POST", headers: { "Content-Type": "application/json" }});
        
        
            } catch (error) {
                console.error("Произошла ошибка при запросе:", error);
            } */
        } else {
            alert('Выберите количество товара');
        }
    }
    
    return (
        <div className='App'>
            <section className="welcome-section">
                <h1>{kategooria}</h1>
                <p><table className="custom-table">
                    <thead>
                        <th>Nimetus</th>
                        <th>Kogus</th>
                        <th>Ühik</th>
                        <th>Hind</th>
                        <th colSpan={2}></th>   
                    </thead>
                    {tooted.length > 0 ? (
                        <tbody>
                            {tooted.map((toode) => (
                            <tr key={toode.id}>
                                <td>{toode.nimetus}</td>
                                <td>{toode.kogus}</td>
                                <td>{toode.uhik}</td>
                                <td>{toode.hind}</td>
                                <td><input ref={kogusRef} type='number' min={0} max={toode.kogus}/></td>   
                                <td>                         
                                {auth.isAuthenticated ? (
                                    <button className="tootedbtn" onClick={() => LisaToodeOstukorvi(toode.id, kogusRef.current.value)}>↪</button>
                                ) : (
                                    <button className="tootedbtn" onClick={() => alert('Чтобы добавить товар в корзину войдите в аккаунт')}>↪</button>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                            <td>Loading...</td>
                            </tr>
                        </tbody>
                    )}
                    
                </table></p>
            </section>          
        </div>
    );
}

export default TootedPage;