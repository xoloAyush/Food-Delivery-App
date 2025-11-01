require('dotenv').config()

const app = require('./src/app')

const port = process.env.PORT || 5000
const connectDB = require('./src/db/db')
connectDB()

app.listen(port, ()=>{
    console.log(`server runs on port ${port}`)
})