import FormularioContacto from '../components/FormularioContacto';

const Contacto = () => {
  return (
    <div className="page-container">
      <h1>Página de Contacto</h1>
      <p>Complete el formulario y nos pondremos en contacto.</p>
      
      <div className="contacto-layout">
        <div className="formulario-wrapper">
          <FormularioContacto />
        </div>
        
        <div className="mapa-wrapper">
          <h2>Nuestra Ubicación</h2>
          <iframe
            title="Ubicacion"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-65.4194%2C-24.7994%2C-65.3994%2C-24.7794&layer=mapnik"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacto;