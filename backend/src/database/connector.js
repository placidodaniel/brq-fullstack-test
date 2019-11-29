const mongoose = require('mongoose')
const config = require('config')

const CONNECTION_STRING = config.get('database')

module.exports = () => {
    mongoose.connect(CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}