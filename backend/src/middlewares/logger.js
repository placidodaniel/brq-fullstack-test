const morgan = require('morgan')

module.exports = app => {
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'))
    }
}