import { useEffect, useState } from 'react';

function TootedPage() {
    const [tooted, setTooted] = useState([]);

    const kategooriaId = localStorage.getItem('kategooriaId');

    useEffect(() => {
        async function fetchData() {
            try {
            const responseKategooria = await fetch("https://localhost:7011/Toode/" + kategooriaId);
            
            if (responseKategooria.ok) 
            {
                const json = await responseKategooria.json();
                setTooted(json);         
            } 
            else 
            {
                console.error("Ошибка при получении данных Toode:", responseKategooria.status, responseKategooria.statusText);        
            }
    
            } catch (error) {
            console.error("Произошла ошибка при запросе:", error);
            }
        }
    
        fetchData();
    }, []);
    
    return (
        <div>
            <table>
                <thead>
                    <th>Nimetus</th>
                    <th>Kogus</th>
                    <th>Ühik</th>
                    <th>Hind</th>
                </thead>
                {tooted.length > 0 ? (
                    <tbody>
                        {tooted.map((toode) => (
                        <tr key={toode.id}>
                            <td>{toode.nimetus}</td>
                            <td>{toode.kogus}</td>
                            <td>{toode.uhik}</td>
                            <td>{toode.hind}</td>
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
                
            </table>
        </div>
    );
}

export default TootedPage;