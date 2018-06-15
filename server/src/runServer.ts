import express from 'express'
import bodyParser from 'body-parser'
import configuration from './configuration'
import path from 'path'
import router from './routes'

const app = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(router)

// error handler
app.listen(configuration.port)
