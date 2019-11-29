const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

describe("Server!", function () {
   // Ensure that app and database is running
   this.timeout(6000)

   it ("GET '/vehicles' should return a 200 HTTP Status Code", async function () {
         const response =  await chai.request(app).get('/vehicles')
         expect(response.status).to.equals(200)
   })
})