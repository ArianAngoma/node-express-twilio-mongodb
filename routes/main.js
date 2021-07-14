const {Router} = require('express');
const {main, sendSMS, receiveMessage} = require("../controllers/main");

const router = Router();

// Ruta principal
router.get('/', main);

// Enviar sms
router.post('/send-sms', sendSMS);

// Recivir sms
router.post('/sms', receiveMessage)

module.exports = router;
