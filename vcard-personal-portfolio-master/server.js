const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para permitir solicitudes desde diferentes orígenes

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // O usa otro proveedor SMTP
  auth: {
    user: 'randygutierrez930@gmail.com', // Tu correo
    pass: 'gqmxvghelcmaykkp', // Contraseña de aplicación de Gmail
  },
});

// Ruta para manejar el envío de correos
app.post('/send-email', (req, res) => {
  const { fullname, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'randygutierrez930@gmail.com', // Tu correo donde recibirás el mensaje
    subject: `Nuevo mensaje de ${fullname}`,
    text: `
    Nombre: ${fullname}
    Correo: ${email}
    Mensaje: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ status: "error", message: "No se pudo enviar el mensaje." });
    }
    // Esta respuesta se envía si el correo fue enviado exitosamente
    res.status(200).json({ status: "success", message: "Mensaje enviado correctamente." });
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
