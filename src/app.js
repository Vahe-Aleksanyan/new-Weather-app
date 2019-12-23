const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const PORT = process.env.PORT || 3000

const partials_path = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))

//takes directory to partials
hbs.registerPartials(partials_path)


//way to cutomize server
//this is static! not dynamic

app.use(express.static(path.join(__dirname, '../public')))

app.get("", (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: "Vahe"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'about',
        about: "Lorem Ipsum is a .....",
        name: 'vahe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "help",
        text: "we are going to help you to find your weather, just enter a location and heat enter!!",
        name: "vahe"
    })
})

// says server what to do in case of specific url
//first argument - url, callback, 1 req object incoming requset to server
// res- methods to customize what to send back


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "you should provide address term",
        })
    }

    geocode(req.query.address, (error, { latidute, longtitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error,
            });
        }

        forecast(latidute, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location: location,
                weather: forecastData,
                address: req.query.address

            });
        });
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errr: "no search query string provided"
        })
    }

    res.send({
        products: []
    })
})


app.get('*', (re, res) => {
    res.render('404', {
        title: "404 page",
        name: "vahe",
        message: "sorry we can not find the route"
    })
})

app.listen(PORT, () => {
    console.log(`the server is on port ${PORT}`)
})