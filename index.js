const express = require('express')
const app = express()
const port = 3000
const { Client } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.get('/:number/:code', (req, res) => {
    const number = req.params.number;
    const code = req.params.code;
    let chatId = `${number}@c.us`;
    client.sendMessage(chatId, `Para acceder a tu cita médica ingresa a https://conferencias.beni.gob.bo/${code}`).then((response) => {
        console.log("Enviado");
    })
    res.send('Mensaje enviado');
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})