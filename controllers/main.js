const {sendMessage} = require('../twilio/send-sms');

const main = (req, res) => {
    res.render('index')
}

const sendSMS = async (req, res) => {
    const {msg, phone} = req.body;
    const result = await sendMessage(msg, phone);
    console.log(result);
    res.send('Mensaje enviado')
}

module.exports = {
    main,
    sendSMS
}