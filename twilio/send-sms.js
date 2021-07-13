const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.twilio_auth_token);

const sendMessage = async (msg, phone) => {
    try {
        return await client.messages.create({
            to: phone,
            from: process.env.TWILIO_NUMBER_PHONE,
            body: msg
        });
    } catch (err) {
        console.log(err);
        throw new Error('Error al enviar el mensaje');
    }
}

module.exports = {
    sendMessage
}