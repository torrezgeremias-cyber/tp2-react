import { useState, useEffect } from 'react';

const Inicio = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users?per_page=6')
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar la API:', error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="page-container">
      <h1>Bienvenido a Mi Sitio</h1>
      <p>Explorando tecnologías con React</p>
      
      <h2>Usuarios destacados de GitHub</h2>
      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="api-grid">
          {usuarios.map((user) => (
            <div key={user.id} className="api-card">
              <img src={user.avatar_url} alt={user.login} className="api-img" />
              <h3>{user.login}</h3>
              <p>Tipo: {user.type}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                Ver perfil
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inicio;