const {Router} = require('express');
const {main, sendSMS} = require("../controllers/main");

const router = Router();

router.get('/', main);

router.post('/send-sms', sendSMS)

module.exports = router;
