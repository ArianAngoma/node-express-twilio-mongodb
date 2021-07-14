const {sendMessage} = require('../twilio/send-sms');
const Message = require('../models/message')

const main = async (req, res) => {
    const messages = await Message.find().lean();
    messages.forEach(message => {
        console.log(message.msg);
    })
    res.render('index', {
        messages
    })
}

const sendSMS = async (req, res) => {
    const {msg, phone} = req.body;
    const result = await sendMessage(msg, phone);

    const message = new Message({
        msg,
        to: phone,
        from: process.env.TWILIO_NUMBER_PHONE
    })

    await message.save()


    res.redirect('/');
}

module.exports = {
    main,
    sendSMS
}