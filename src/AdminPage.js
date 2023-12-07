import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function AdminPage() {
    const auth = useContext(AuthContext);
    const [tooted, setTooted] = useState([]);
    const [kategooriad, setKategooriad] = useState([]);
    
    //Показ таблицы и категорий
    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7011/Toode", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (response.ok) {
                const json = await response.json();
                setTooted(json); 
                const responseK = await fetch("https://localhost:7011/Kategooria", {
                    method: "GET",
                    headers: { "Accept": "application/json" }
                });
                if (responseK.ok) {
                    const jsonK = await responseK.json();
                    setKategooriad(jsonK);

                } else {
                    console.error("Ошибка при получении данных Kategooria:", responseK.status, responseK.statusText);
                }                     
            } else {
                console.error("Ошибка при получении данных Toode:", response.status, response.statusText);        
            }
  
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //Превращение Id категории в название
    function getKat(id){  
        for (const kategooria of kategooriad) {
            if (kategooria.id === id) {
                return kategooria.nimetus;
            }
        } 
    } 

    //Добавление товара
    async function AddToode() {
        const nimetus = document.getElementById("nimetus").value;
        const kogus = document.getElementById("kogus").value;
        const uhik = document.getElementById("uhik").value;
        const arve = document.getElementById("arve").value;
        const pilt = document.getElementById("pilt").value;
        const kategooria = document.getElementById("categorySelect").value;

        if (!nimetus || !kogus || !uhik || !arve || !pilt) {
            alert("Заполните все поля");
            return;
        }

        const data = { nimetus, kogus, uhik, arve, pilt, kategooria };
        
        const response = await fetch("https://localhost:7011/Toode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.values(data))
        });
        if (response.ok) {
            fetchData();
            document.getElementById("nimetus").value = "";
            document.getElementById("kogus").value = "";
            document.getElementById("uhik").value = "";
            document.getElementById("arve").value = "";
            document.getElementById("pilt").value = "";
            window.location.href = "#firstSection";
        }
    }

    //Удаление товара
    async function deleteToode(id) {
        try {
            const response = await fetch(`https://localhost:7011/Toode/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchData();
            } else {
                console.error('Failed to delete data:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    } 

    //Изменение ячеек на input поля    
    async function handleTableCellClick(event) { //Решить проблему с картинками
        const target = event.target;
        if (target.classList.contains('editableText') || target.classList.contains('editableNumber') || target.classList.contains('editableHind')) {
            const oldValue = target.innerText;
            const input = document.createElement('input');
            if (target.classList.contains('editableText')) {
                input.type = 'text';
            } else {
                input.type = 'number';
            }
            
            if (target.classList.contains('editableHind')) {
                input.value = oldValue.replace("€", "");
            } else {
                input.value = oldValue;
            }            

            input.addEventListener('blur', () => {
                const newValue = input.value;
                if (target.classList.contains('editableHind')) {
                    target.innerText = newValue + "€";
                } else {
                    target.innerText = newValue;
                }                  
            });

            target.innerText = '';
            target.appendChild(input);
            input.focus();
        }        
        else if (target.classList.contains('editableCategory')) {                
            const oldValue = target.innerText;
            const select = document.createElement('select');

            await fetch("https://localhost:7011/Kategooria/")
                .then(response => response.json())
                .then(data => {
                    data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.nimetus;
                        option.text = category.nimetus;
                        select.appendChild(option);
                    });
                })
                .catch(error => console.error('Ошибка при получении данных с сервера:', error));

            select.addEventListener('blur', () => {
                const newValue = select.value;
                target.innerText = newValue;
            });

            target.innerText = '';
            target.appendChild(select);
            select.focus();

            const options = select.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === oldValue) {
                    option.selected = true;
                }
            });
        }
    }

    //Изменение товара   
    async function updateToode(row) { //Проблема с картинкой
        const id = row.getAttribute('data-rowid');
        const nimetus = row.querySelector('[data-field="nimetus"]').innerText;
        const kogus = row.querySelector('[data-field="kogus"]').innerText;
        const uhik = row.querySelector('[data-field="uhik"]').innerText;
        let hind = row.querySelector('[data-field="hind"]').innerText;
        hind = hind.replace("€", "");
        const pilt = row.querySelector('[data-field="pilt"]').innerText;
        const kategooria = row.querySelector('[data-field="kategooria"]').innerText;

        const data = { id, nimetus, kogus, uhik, hind, pilt, kategooria };
        try {
            const response = await fetch("https://localhost:7011/Toode", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.values(data))
            });

            if (response.ok) {
                fetchData();
                alert('Данные изменены');                
            } else {
                console.error('Failed to update data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    return (
        <div className='App'>
            <NavigationPanel /> 
            {auth.isAdmin ? (
            <div>
                <section id="firstSection" className="welcome-section">
                <h1>Tooted</h1>
                <p>
                    <div className="table-container">
                        <table className='custom-table' id="tootedTable">
                            <thead>
                                <tr>
                                    <th>Toode ID</th>
                                    <th>Nimetus</th>
                                    <th>Kogus</th>
                                    <th>Ühik</th>
                                    <th>Hind</th>
                                    <th>Pilt</th>
                                    <th>Kategooria</th>
                                    <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody onClick={(event) => handleTableCellClick(event)}>
                                {tooted.map((toode) => (
                                    <tr data-rowid={toode.id}>
                                        <td data-field="id">{toode.id}</td>
                                        <td data-field="nimetus" className="editableText">{toode.nimetus}</td>
                                        <td data-field="kogus" className="editableNumber">{toode.kogus}</td>
                                        <td data-field="uhik" className="editableText">{toode.uhik}</td>
                                        <td data-field="hind" className="editableHind">{toode.hind}€</td>
                                        <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <div data-field="pilt" className="editableText" style={{ overflowY: 'auto', maxHeight: '75px' }}>{toode.pilt}</div>
                                        </td>
                                        <td data-field="kategooria" className="editableCategory">{getKat(toode.kategooriaId)}</td>
                                        <td><button onClick={() => updateToode(document.querySelector(`[data-rowid="${toode.id}"]`))}><i className="fa fa-pencil fa-2x" aria-hidden="true"></i></button></td>
                                        <td><button onClick={() => deleteToode(toode.id)}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </p>
                </section>
                <section className="projects-section">
                    <h2 className="projects-section-header">Toode lisamine</h2>
                    <div className="divForm">
                        <label>Nimetus:<input type="text" id="nimetus" /></label>
                        <label>Kogus:<input type="number" id="kogus" min="0" /></label>
                        <label>Ühik:<input type="text" id="uhik" /></label>
                        <label>Hind: (€)<input type="number" id="arve" min="0" /></label>
                        <label>Pilt:<input type="text" id="pilt" /></label>
                        <label>Kategooria: <br />
                            <select id="categorySelect">
                                {kategooriad.map((kategooria) => (<option value={kategooria.id}>{kategooria.nimetus}</option>))}
                            </select>
                        </label>
                        <button onClick={AddToode}>Lisa Toode</button>
                    </div>
                </section>  
            </div>            
            ) : (
                <section className="welcome-section">
                    <h1>Вы не админ</h1>
                </section>
            )}       
        </div>
    );
}


export default AdminPage;