import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

function OstukorvPage() {
  const auth = useContext(AuthContext);
  const [tellimused, setTellimused] = useState([]);
  const bugEmail = localStorage.getItem('email');

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7011/Tellimus/" + bugEmail);

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


    fetchData();
  } , []);

  function Maksa() {

    const selectedValues = [];

    const trElements = document.querySelectorAll("tbody tr");
    trElements.forEach((tr) => {
      const tdElements = tr.querySelectorAll("td");

      selectedValues.push(tdElements[0].textContent + "." + tdElements[1].textContent);
      
    });

    console.log(selectedValues);

    /*fetch("https://localhost:7011/TellimusArves/lisa/" + JSON.stringify(selectedValues), {"method": "POST"});*/

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

  return (       
    <div className="App">
      {auth.isAuthenticated ? (
        <section id="welcome-section" class="welcome-section">
          <h1>Ostukorv</h1>
          <p>
            <table className="custom-table">
              <thead>
                  <th>Toode</th>
                  <th>Kogus</th> 
                  <th></th>
              </thead>
              {tellimused.length > 0 ? (
                  <tbody>
                      {tellimused.map((tellimus) => (
                      <tr key={tellimus.id}>
                          <td>{tellimus.toodeId}</td> 
                          <td>{tellimus.kogus}</td> 
                          <button onClick={() => Kustuta(tellimus.id)}><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button>
                      </tr>
                      ))}
                  </tbody>
              ) : (
                  <tbody>
                      <tr>
                        <td>
                          <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                          <span class="sr-only">Loading...</span>
                        </td>
                      </tr>
                  </tbody>
              )}                    
            </table>
          </p>
          <p><button className='maksebtn' onClick={() => Maksa()}>Maksa</button></p>
        </section>
        ) : (
          <section id="welcome-section" class="welcome-section">
            <h1>Ostukorv</h1>
            <p>Войдите в аккаунт чтобы пользоваться корзиной</p>
          </section>
      )}     
    </div>
  );
}

export default OstukorvPage;