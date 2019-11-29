const app = require('../app')
const request = require('supertest')
const chai = require('chai')

chai.should()

const payload = {
	chassisId: {
		series: "aa-bbb",
		number: 123456
	},
	type: "Car",
	color: "White"
}

describe("Vehicle API tests", function () {
   // Ensure that app and database is running
   this.timeout(10000)

   describe("GET /vehicles", function () {
      it ("should return a 200 HTTP Status Code", async function () {
				const response = await request(app).get('/vehicles')

				response.status.should.be.equal(200)
      })
	 })

	 describe("POST /vehicles", function () {
		it ("should insert a new vehicle", async function () {
			const res = await request(app)
				.post('/vehicles')
				.send(payload)
				.set('Accept', 'application/json')

				res.status.should.be.equal(200)
		})

		it ("should not insert a vehicle with a duplicate chassisId", async function () {
			const res = await request(app)
				.post('/vehicles')
				.send(payload)
				.set('Accept', 'application/json')

				res.status.should.not.be.equal(200)
				res.body.should.be.equal("The given ChassisID already exists on database")
		})

		it ("should find a vehicle by chassiId and display all informations", async function () {
			const { chassisId } = payload

			const res = await request(app)
				.post('/vehicles/find')
				.send({ chassisId })
				.set('Accept', 'application/json')

				let { type, passengers, color } = res.body
				const body = { chassisId, type, passengers, color }

				// Our payload set the type of the vehicle to 'Car'. So, we expect that
				// the number of passengers is 4.
				body.should.be.eql({...payload, type: type.toUpperCase(), passengers: 4 })
				res.status.should.be.equal(200)
		})
	})

	describe('PUT /vehicles', function () {
		it ("should find a vehicle by id and update the color", async function () {
			const { chassisId } = payload

			const find = await request(app)
				.post('/vehicles/find')
				.send({ chassisId })
				.set('Accept', 'application/json')

			const { _id } = find.body

			const res = await request(app)
				.put('/vehicles/update')
				.send({ _id, color: 'Green' })
				.set('Accept', 'application/json')

			const { color } = res.body

			res.status.should.be.equal(200)
			color.should.be.equal("Green")
		})
	})

	describe('DELETE /vechicles', function () {
		it ("should find a vehicle by chassiId and delete it", async function () {
			const { chassisId } = payload

			const find = await request(app)
				.post('/vehicles/find')
				.send({ chassisId })
				.set('Accept', 'application/json')

			const { _id } = find.body

			const res = await request(app)
				.delete('/vehicles/delete')
				.send({ _id })
				.set('Accept', 'application/json')

			res.status.should.be.equal(200)
		})
	})

})