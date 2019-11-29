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

    mongoose.connection.on('connected', () => {
        console.log('Connection with MongoDB was established!')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database: Disconnected')
    })

    mongoose.connection.on('error', () => {
        console.log('Database: Error')
    })
}