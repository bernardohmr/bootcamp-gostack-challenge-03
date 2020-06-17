import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Projeto ${Date.now()}`,
      url: "www.elianerangel.com",
      techs: ["nodeJs", "reactJs", "reactNative"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    if (id < 0) { return; }
    const newList = repositories.filter(el => el.id !== id);
    setRepositories(newList);
  }

  useEffect(() => {
    api.get("repositories")
      .then((response) => {
        setRepositories(response.data);
      });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
