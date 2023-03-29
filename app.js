const express = require('express');
const pizzaRoute = require('./routers/pizzaRouter');
const {homePage} = require('./controller/homeController');

// The App
const app = express();
const PORT = 3000;

// App settings
app.set('view engine', 'ejs');

// Middleware
app.use([
        express.urlencoded({extended: false}),
        express.json(),
        express.static('public')
    ]);

// get the home page
app.get('/', homePage);

// Routers

app.use('/pizza', pizzaRoute);


app.listen(PORT);