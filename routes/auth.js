// path: api/login

const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { Router, response } = require('express');
const { validateField } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');



const router = Router();

router.post('/new', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory').not().isEmpty().isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
    check('email', 'Name is mandatory').not().isEmpty().isEmail().withMessage('Invalid email format'),
    validateField
], createUser)

router.post('/', [
    check('password', 'Password is mandatory').not().isEmpty(),
    check('email', 'Name is mandatory').not().isEmpty().isEmail().withMessage('Invalid email format'),
    validateField
], loginUser)

router.get('/renew', [validateJWT], renewToken);

module.exports = router;


