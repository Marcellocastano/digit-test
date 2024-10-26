const jwt = require('jsonwebtoken')
const SECRET_KEY = 'chiave_segreta_molto_sicura'

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token mancante' })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token non valido' })
    }
}

module.exports = authenticateToken

