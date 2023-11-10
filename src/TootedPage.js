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
                                <td><input id={toode.id} type='number' min={0} max={toode.kogus}/></td>
                                <td>                         
                                {auth.isAuthenticated ? (
                                    <button id={'button' + toode.id} onClick={() => LisaToodeOstukorvi(toode.id, document.getElementById(`${toode.id}`).value)}><i class="fa fa-shopping-cart fa-2x fa-fw"></i></button>
                                ) : (
                                    <button onClick={() => alert('Чтобы добавить товар в корзину войдите в аккаунт')}><i class="fa fa-user-circle-o fa-2x fa-fw"></i></button>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                                    <span class="sr-only">Loading...</span>  
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    )}
                    
                </table></p>
            </section>          
        </div>
    );
}

export default TootedPage;