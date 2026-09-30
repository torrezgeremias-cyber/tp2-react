import { useState } from 'react';
import emailjs from '@emailjs/browser';

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
    // Validar Nombre
    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.nombre)) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras.';
    }

    // Validar Apellido
    if (!datos.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.apellido)) {
      nuevosErrores.apellido = 'El apellido solo puede contener letras.';
    }

    // Validar Correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!regexCorreo.test(datos.correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }

    // Validar Mensaje
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
    e.preventDefault();
    const erroresValidacion = validar();
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length === 0) {
      // Aquí van tus credenciales de EmailJS
      emailjs.send(
        'service_6eqw9i8',    // Reemplazar
        'template_sqj47y4',   // Reemplazar
        {
          from_name: `${datos.nombre} ${datos.apellido}`,
          from_email: datos.correo,
          message: datos.mensaje,
        },
        't5a7lbPUgpfsbR1Yy'       // Reemplazar
      )
      .then(() => {
        setEnviado(true);
        setDatos({ nombre: '', apellido: '', correo: '', mensaje: '' });
        setErrores({});
      })
      .catch((error) => {
        alert('Hubo un error al enviar el mensaje. Intente nuevamente.');
        console.error(error);
      });
    }
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Contacto</h2>
      {enviado && <p className="exito">¡Mensaje enviado con éxito!</p>}
      <form onSubmit={manejarEnvio} noValidate>
        
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