import { useState } from 'react';

const FormularioContacto = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const nuevosErrores = {};

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.nombre)) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras.';
    }

    if (!datos.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.apellido)) {
      nuevosErrores.apellido = 'El apellido solo puede contener letras.';
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!regexCorreo.test(datos.correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.';
    } else if (datos.mensaje.length > 300) {
      nuevosErrores.mensaje = 'El mensaje no puede superar los 300 caracteres.';
    }

    return nuevosErrores;
  };

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    const erroresValidacion = validar();
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      e.preventDefault();
    } else {
      setTimeout(() => setEnviado(true), 500);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Contacto</h2>
      {enviado && <p className="exito">¡Mensaje enviado con éxito!</p>}
      
      <form 
        action="https://formsubmit.co/torrezgeremias@gmail.com" 
        method="POST"
        onSubmit={manejarEnvio}
        noValidate
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Nuevo mensaje desde el sitio web" />
        
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={manejarCambio}
            placeholder="Ingrese su nombre"
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={manejarCambio}
            placeholder="Ingrese su apellido"
          />
          {errores.apellido && <span className="error">{errores.apellido}</span>}
        </div>

        <div className="campo">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={manejarCambio}
            placeholder="ejemplo@correo.com"
          />
          {errores.correo && <span className="error">{errores.correo}</span>}
        </div>

        <div className="campo">
          <label>Mensaje (máx. 300 caracteres):</label>
          <textarea
            name="mensaje"
            value={datos.mensaje}
            onChange={manejarCambio}
            maxLength="300"
            rows="4"
            placeholder="Escriba su mensaje aquí..."
          ></textarea>
          <small>{datos.mensaje.length}/300</small>
          {errores.mensaje && <span className="error">{errores.mensaje}</span>}
        </div>

        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default FormularioContacto;