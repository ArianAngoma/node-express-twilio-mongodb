const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {sendMessage} = require('../twilio/send-sms');
const Message = require('../models/message');

const main = async (req, res) => {
    const messages = await Message.find().sort('-createdAt').lean();
    res.render('index', {
        messages
    })
}

const sendSMS = async (req, res) => {
    const {msg, phone} = req.body;

    // Enviar mensaje mediante Twilio
    const result = await sendMessage(msg, phone);

    const message = new Message({
        msg,
        to: phone,
        from: process.env.TWILIO_NUMBER_PHONE
    })

    await message.save()

    res.redirect('/');
}

const receiveMessage = async (req, res) => {
    // Coloco datos por defecto por que me consume saldo enviar mensajes
    const {To: to = '+16672136813', From: from = '+51983416698', Body: msg = 'Hola, estoy aqui 4'} = req.body;
    console.log({to, from, msg});

    const message = new Message({
        msg,
        to,
        from
    })
    await message.save();

    // Emitir evento para el cliente - enviar el nuevo mensaje
    global.io.emit('new_message', message);

    const twiml = new MessagingResponse();

    // Para recivir mensaje - no es necesario
    // twiml.message('Este es mi respuesta');

    res.send(twiml.toString());
}

module.exports = {
    main,
    sendSMS,
    receiveMessage
}