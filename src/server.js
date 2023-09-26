require('express-async-errors')
require('dotenv/config')
const express = require('express')
const cors = require('cors')

const appError = require('./utils/appError')
const routes = require('./routes')
const uploadConfig = require('./configs/upload')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use( (error, request, response, next) => {
    if ( error instanceof appError ) {
        return response.status(error.status).json({ message: error.message})
    }
    return response.status(500).json({ message: `Server Error ${error.message}`})
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(PORT))