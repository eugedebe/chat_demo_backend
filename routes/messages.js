// path: api/messages
const { getMessagesFromChat } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate-jwt');
const { Router } = require('express');




const router = Router();

router.get('/:from', [validateJWT], getMessagesFromChat);

module.exports = router;


