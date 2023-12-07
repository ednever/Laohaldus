import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function ToodePage() {
    const [toode, setToode] = useState(null);
    const auth = useContext(AuthContext);

    const toodeId = localStorage.getItem('toodeId');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://localhost:7011/Toode/" + toodeId);

                if (response.ok) {
                    const json = await response.json();
                    setToode(json);   
                } else {
                    console.error("Ошибка при получении данных Toode:", response.status, response.statusText);        
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
                fetch('https://localhost:7011/Tellimus/lisa/' + toodeId + '/' + kogus + '/' + localStorage.getItem('email'), 
                    { method: "POST", headers: { "Content-Type": "application/json" }}); 
                alert('Товар добавлен в корзину');
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
            <section className="projects-section">
                
                {toode ? (
                    <div>
                        <h1>{toode.nimetus}</h1>
                        <div className="image-container">                        
                            <div className="test-grid">
                                <div className="test" key={toode.id}>
                                    <a className="test-tile">
                                        <img className="test-image" src={toode.pilt} alt="toode" />                                                             
                                        <div className="test-details">
                                            <p>Kogus: {toode.kogus} {toode.uhik}</p>
                                            <p>Hind: {toode.hind}€</p>
                                        </div>
                                    </a>
                                </div>                            
                            </div> 
                        </div> 
                        <table className='custom-table'>
                            <thead>
                                <tr>
                                    <th>Kogus</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input id={toode.id} type='number' min={0} max={toode.kogus}/></td>
                                    <td>
                                        {auth.isAuthenticated ? (
                                            <button id={'button' + toode.id} onClick={() => LisaToodeOstukorvi(toode.id, document.getElementById(`${toode.id}`).value)}><i class="fa fa-shopping-cart fa-2x fa-fw"></i></button>
                                        ) : (
                                            <button onClick={() => alert('Чтобы добавить товар в корзину войдите в аккаунт')}><i className="fa fa-user-circle-o fa-2x fa-fw"></i></button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>                                                                                
                ) : (
                    <div>
                        <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                        <span className="sr-only">Loading...</span> 
                    </div>                   
                )}   
            </section>          
        </div>
    );
}

export default ToodePage;