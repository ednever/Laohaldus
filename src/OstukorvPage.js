import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import NavigationPanel from './NavigationPanel';

function OstukorvPage() {
  const auth = useContext(AuthContext);
  const [tellimused, setTellimused] = useState([]);
  const [tooted, setTooted] = useState([]);
  const bugEmail = localStorage.getItem('email');
  const bugUsername = localStorage.getItem('username');

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7011/Tellimus/" + bugEmail);

            if (response.ok) {
                const json = await response.json();
                setTellimused(json);

                const responseT = await fetch("https://localhost:7011/Toode", {
                    method: "GET",
                    headers: { "Accept": "application/json" }
                });
                if (responseT.ok) {
                    const jsonT = await responseT.json();
                    setTooted(jsonT);
                } else {
                    console.error("Ошибка при получении данных Toode:", responseT.status, responseT.statusText);
                }         
            } else {
                console.error("Ошибка при получении данных Tellimus:", response.status, response.statusText);     
            }
                      
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error);
        }
    }


    fetchData();
  } , []);

  //Превращение Id товара в название
  function getToode(id, tegevus) {  
    for (const toode of tooted) {
      if (toode.id === id) {
        if (tegevus === "nimetus") {
          return toode.nimetus;        
        }
        else if (tegevus === "uhik") {
          return toode.uhik;         
        }
        else {
          return toode.hind * tegevus;         
        }
      }    
    } 
  } 

  async function Maksa() {
    const selectedValues = [];

    const trElements = document.querySelectorAll("tbody tr");
    trElements.forEach((tr) => {
      const tdElements = tr.querySelectorAll("td");

      selectedValues.push(tdElements[0].textContent + "." + tdElements[1].textContent);
      
    });

    console.log(selectedValues);
    openModal();
    document.getElementById('HaHaHa').innerHTML = '';

    for (const tellimus of tellimused) {    
      for (const toode of tooted) {
        if (toode.id === tellimus.toodeId) {

          const id = toode.id.toString();
          const nimetus = toode.nimetus;
          const kogus = (toode.kogus - tellimus.kogus).toString();
          const uhik = toode.uhik;
          const hind = toode.hind.toString();
          const pilt = toode.pilt;
          const kategooria = toode.kategooriaId.toString();

          const data = { id, nimetus, kogus, uhik, hind, pilt, kategooria };
          //alert(JSON.stringify(Object.values(data)));
          try {
            const response = await fetch("https://localhost:7011/Toode", {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.values(data))
            });

            if (response.ok) {
              alert('Данные изменены');                
            } else {
              console.error('Failed to update data:', response.statusText);
            }
          } catch (error) {
            console.error('Error updating data:', error);
          }
        }
      } 
    }


    //Создание счёта
    //fetch("https://localhost:7011/Arve/lisa/", {"method": "POST"});
    //Запись добавления соединения счёта с заказами
    //fetch("https://localhost:7011/TellimusArves/lisa/" + JSON.stringify(selectedValues), {"method": "POST"});

  }

  async function Kustuta(tellimusId) {
    try {
      const response = await fetch("https://localhost:7011/Tellimus/kustuta/" + tellimusId, {"method": "DELETE"}) 

      if (response.ok) {
          const json = await response.json();
          setTellimused(json);
      } else {
          console.error("Ошибка при получении данных Tellimus:", response.status, response.statusText);     
      }                 
    } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function arveSumma() {
    let sum = 0;
    for (const tellimus of tellimused) {
      const numericValue = getToode(tellimus.toodeId, tellimus.kogus);
      sum += numericValue;
    }
    return sum;   
  }

  return (       
    <div className="App">
      <NavigationPanel />
      {auth.isAuthenticated ? (
        <section className="welcome-section">
          <h1>Ostukorv</h1>
          <p>
            <div className="table-container">
            <table className="custom-table">
              <thead>
                  <th>Toode</th>
                  <th>Kogus</th> 
                  <th>Ühik</th>
                  <th>Hind</th>
                  <th></th>
              </thead>
              {tellimused.length > 0 ? (
                  <tbody id='HaHaHa'>
                      {tellimused.map((tellimus) => (
                      <tr key={tellimus.id}>
                          <td>{getToode(tellimus.toodeId, "nimetus")}</td> 
                          <td>{tellimus.kogus}</td> 
                          <td>{getToode(tellimus.toodeId, "uhik")}</td> 
                          <td>{getToode(tellimus.toodeId, tellimus.kogus)}€</td> 
                          <td><button onClick={() => Kustuta(tellimus.id)}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button></td>
                      </tr>
                      ))}
                  </tbody>
              ) : (
                  <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                          <span className="sr-only">Loading...</span>
                        </td>
                      </tr>
                  </tbody>
              )}                    
            </table>
            </div>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <p>Arve nr 1 Koostatud 08.12.2023</p><br />
                  <p>Tellija: {bugUsername}</p><br />
                  <table border={1}>
                    <thead>
                      <tr>
                        <th>Toode nimetus</th>
                        <th>Kogus</th>
                        <th>Ühik</th>
                        <th>Hind</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tellimused.map((tellimus) => (
                        <tr data-rowid={tellimus.id}>
                            <td>{getToode(tellimus.toodeId, "nimetus")}</td> 
                            <td>{tellimus.kogus}</td> 
                            <td>{getToode(tellimus.toodeId, "uhik")}</td> 
                            <td>{getToode(tellimus.toodeId, tellimus.kogus)}€</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3}>Summa käibemaksuta:</td><td>{arveSumma()}€</td>
                      </tr>
                      <tr>
                        <td colSpan={3}>Käibemaksumäär:</td><td>0%</td>
                      </tr>
                      <tr>
                        <td colSpan={3}><strong>Summa käibemaksuga:</strong></td><td><strong>{arveSumma()}€</strong></td>
                      </tr>
                    </tbody>
                  </table><br />
                  <p>Täname ostu eest!</p>
                </div>
              </div>
            )}
          </p>
          <p><button className='maksebtn' onClick={() => Maksa()}>Maksa</button></p>
        </section>
        ) : (
          <section className="welcome-section">
          <h1>Ostukorv</h1>
        </section>
      )}     
    </div>
  );
}

export default OstukorvPage;