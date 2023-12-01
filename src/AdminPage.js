import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function AdminPage() {
    const auth = useContext(AuthContext);

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch("https://localhost:7011/Toode/" + toodeId);

        //         if (response.ok) {
        //             const json = await response.json();
        //             setToode(json);   
        //         } else {
        //             console.error("Ошибка при получении данных Toode:", response.status, response.statusText);        
        //         }
    
        //     } catch (error) {
        //         console.error("Произошла ошибка при запросах:", error);
        //     }
        // }
    
        // fetchData();
    }, []);


    
    return (
        <div className='App'>
            <NavigationPanel /> 
            <section className="welcome-section">
                <h1>Tellimused</h1>
                <p>
                    <table id="tellimusedTable">
                        <thead>
                            <tr>
                                <th>Tellimus ID</th>
                                <th>Kategooria</th>
                                <th>Nimetus</th>
                                <th>Kogus</th>
                                <th>Arve <button><i className="fa fa-arrow-down" aria-hidden="true"></i></button></th>
                                <th>Tellija</th>
                                <th>Kuupäev</th>
                                <th colspan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </p>
                </section>
                <section className="projects-section">
                    <h2 className="projects-section-header">Tellimuse lisamine</h2>
                    <form method="post" id="tellimusForm">
                        <div><label>Kategooria:<input type="text" name="kategooria" required /></label></div>
                        <div><label>Nimetus:<input type="text" name="nimetus" required /></label></div>
                        <div><label>Kogus:<input type="number" name="kogus" min="0" required /></label></div>
                        <div><label>Arve: (€)<input type="number" name="arve" min="0" required /></label></div>
                        <div><label>Tellija:<input type="text" name="tellija" required /></label></div>
                        <div><label>Kuupäev:<input type="date" name="kuupaev" required /></label></div>
                        <input type="submit" value="Lisa tellimus" />
                    </form>
            </section>        
        </div>
    );
}

export default AdminPage;