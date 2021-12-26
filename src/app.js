const express  = require('express')
const configure = require('./config')
const loader = require('./loaders')
const errorHandler = require('./middlewares/errorHandler')
const { RecordRouter } = require('./routes')

configure()
loader()

const app = express()

app.use(express.json())

app.listen(process.env.APP_PORT, () => {
    console.log('Application is running on: ', process.env.APP_PORT)
    
    app.use('/records', RecordRouter)

    app.use((req, res, next) => {
        const error = new Error("Böyle bir EP Bulunmamaktadır..");
        error.status = 404;
        next(error);
      });
    
      app.use(errorHandler);
})
