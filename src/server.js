const app = require('./app')

app.listen(8080, () => {
    console.log('Application is running on: ', process.env.APP_PORT)
})

