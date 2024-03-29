const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Hoyles'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Hoyles'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide address to find!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/dinosaur', (req, res) => {
    res.render('dinosaur', {
        title: 'Dinosaurs',
        name: 'Noah Hoyles'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide the master with a term to search!"
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        helpText: 'Please help me, I am stuck and do not know what to do.',
        name: 'Daniel Hoyles'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Sorry',
        errorMessage: 'Help article not found.',
        name: 'Daniel Hoyles'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Daniel Hoyles'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})