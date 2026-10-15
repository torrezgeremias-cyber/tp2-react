import { servicios } from '../data/servicios';

const Servicios = () => {
  return (
    <div className="page-container">
      <h1>Nuestros Servicios</h1>
      <div className="servicios-grid">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="servicio-card">
            <img src={servicio.imagen} alt={servicio.nombre} className="servicio-img" />
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
            <span className="nivel">{servicio.nivel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;