const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Configurar nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'leonardojeffer.145@gmail.com',
        pass: 'qhbotsegzmtxzzpt'
    }
});

// Configurar body-parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const servidor = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/send-email') {
        // Usar el middleware body-parser para analizar el cuerpo de la solicitud
        urlencodedParser(req, res, () => {
            const { name, email, message } = req.body;

            // Configurar el correo electrónico
            const mailOptions = {
                from: 'leonardojeffer.145@gmail.com',
                to: 'leonardojeffer.145@gmail.com',
                subject: `Nuevo mensaje de ${name}`,
                text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.statusCode = 500;
                    res.end('Error al enviar el correo electrónico');
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                    res.statusCode = 200;
                    res.end('Correo electrónico enviado correctamente');
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Ruta no encontrada');
    }
});

servidor.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});