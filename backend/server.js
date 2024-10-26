const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const fs = require('fs')
const authenticateToken = require('./authMiddleware')

const app = express()
app.use(express.json())
app.use(cors())

const users = JSON.parse(fs.readFileSync('users.json', 'utf8'))
const SECRET_KEY = 'chiave_segreta_molto_sicura'

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' })
        res.json({ token })
    } else {
        res.status(401).json({ message: 'Credenziali non valide' })
    }
})

app.get('/welcome', authenticateToken, (req, res) => {
    res.json({ message: `Benvenuto ${req.user.username}` })
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`))
