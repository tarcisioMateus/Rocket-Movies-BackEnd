require('express-async-error')
const express = require('express')

const appError = require('./utils/appError')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

app.use( (error, request, response, next) => {
    if ( error instanceof appError ) {
        return response.json( error.message)
    }
    return response.json(`Server Error ${error.message}`)
})

const PORT = 3000
app.listen(PORT, () => console.log(PORT))