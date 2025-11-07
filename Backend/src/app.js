const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const shopRouter = require('./routes/shop.routes')
const itemRouter = require('./routes/item.routes')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth/', authRouter)
app.use('/api/user/', userRouter)
app.use('/api/shop/', shopRouter)
app.use('/api/item/', itemRouter)

module.exports = app