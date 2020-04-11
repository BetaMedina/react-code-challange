import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  function handleAddRepository() {

    const params = {
      title: `Novo item adicionado - ${Date.now()}`,
      url: "https://github.com/BetaMedina",
      techs: ["Nest.js", "Node.js", "Native", "React"],
    };
    
    api.post("repositories", params).then(res=>{
      setRepositories([...repositories,res.data])
    })
   
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((res) => {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    });
  }

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={()=>handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
