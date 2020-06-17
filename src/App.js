import React from 'react';
import api from './services/api';
import './styles.css';
import { useState, useEffect } from 'react';

function App() {

  const [repositories, setRepositories] = useState([]); 

  useEffect(()=>{
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    });
  },[]);
  
  async function handleAddRepository() {
    const response = await api.post( '/repositories',{
        "title" : `Novo ${Date.now()}`,
        "url" : "www",
        "techs" : ["te", "sw"],
        "likes": 0
      });
      const repositore = response.data;
      setRepositories([...repositories, repositore]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoriesAux = repositories.filter(rep => rep.id !== id);
    setRepositories(repositoriesAux);
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(rep => <li key={rep.id}>

        {rep.title}
        
        <button onClick={() => handleRemoveRepository(rep.id)}>
          Remover
        </button>

        </li>)}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
