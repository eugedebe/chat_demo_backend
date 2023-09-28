// path: api/users
const { getUsers } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { Router, response } = require('express');




const router = Router();

router.get('/', [validateJWT], getUsers);

module.exports = router;


