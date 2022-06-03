const app = require('express')
const User = require('../models/user')
const router = app.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const middleware = require('../middlewares/jwt')

router.post('/', async (req, res) => {

    //crypt password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    
    //Create the user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    //verify if the user that we sent exist in the database
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    try {
        //save user
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/login', async (req, res) => {
    
    //find the user in the database
    const user = await User.findOne({email: req.body.email})

    //verify the password with bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({error: 'Constraseña invalida'})

    //assign content to the token (1234567$. is the secret password)
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "1234567$.")
    
    res.header('auth-token', token).json({
        error: null,
        data: { token },
        message: 'Bienvenido'
    })

})

router.get('/all', middleware, (req, res) => {
    res.json({
        message: 'You send the token :)'
    })
})
module.exports = router