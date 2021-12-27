const express  = require('express')
const configure = require('./config')
const loader = require('./loaders')
const errorHandler = require('./middlewares/errorHandler')
const { RecordRouter } = require('./routes')
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

configure()
loader()

const app = express()

app.use(express.json())
app.use(
  cors({
    methods: "*",
    origin: "*",
  })
)

setUpLoggers()

app.listen(process.env.APP_PORT, () => {
  console.log('Application is running on: ', process.env.APP_PORT)
  
  app.use('/records', RecordRouter)

  app.use((req, res, next) => {
    const error = {
      code: '404',
      msg: 'No route was found'
    }
    next(error);
  });
  
  app.use(errorHandler);
})


function setUpLoggers() {
  // Setup network logger
  let networkPath = path.join(__dirname, 'logs/network')
  if (!fs.existsSync(networkPath)) {
    fs.mkdirSync(networkPath, { recursive: true })
  }
  app.use(morgan('tiny', {stream: fs.createWriteStream(path.join(networkPath, 'network.log'), {flags: 'a'})}))

  // Setup error logger
  let errorPath = path.join(__dirname, 'logs/error')
  if (!fs.existsSync(errorPath)) {
    fs.mkdirSync(errorPath, { recursive: true })
  }
  app.use(morgan('combined', { skip: (req, res) => { return res.statusCode < 400 }, stream: fs.createWriteStream(path.join(errorPath, 'error.log'), {flags: 'a'})}))
  
}