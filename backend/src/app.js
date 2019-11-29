const app = require('express')()
const consign = require('consign')

consign({ verbose: true, cwd: 'src'})
   .include('database')
   .then('middlewares')
   .then('server')
   .into(app)

module.exports = app