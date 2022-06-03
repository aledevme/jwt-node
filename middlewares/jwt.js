const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // Getting token from the header
    const token = req.header('auth-token')
    // Validate if token exist in the header request
    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try {
        //verify the token with the secret password
        const verified = jwt.verify(token, "1234567$.")
        
        req.user = verified

        //pass to process request
        next()
    } catch (error){
        res.status(400).json({error: 'Token no valido, acceso denegado'})
    }
}

module.exports = verifyToken