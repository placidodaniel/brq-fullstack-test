const cors = require('cors')
const express = require('express')

module.exports = app => {
    app.use(express.urlencoded({
        extended: false
    }))
    app.use(cors({
        origin: '*'
    }))
}