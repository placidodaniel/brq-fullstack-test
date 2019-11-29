const debug = require('debug')('server:debug')
const config = require('config')

const PORT = config.get('port')
const ENVIRONMENT = config.get('environment')

module.exports = app => {
   app.listen(PORT, () => {
      debug(`Server is running on port ${PORT} and in ${ENVIRONMENT} environment`)
      console.log(`Server is running on port ${PORT} and in ${ENVIRONMENT} environment`)
   })
}