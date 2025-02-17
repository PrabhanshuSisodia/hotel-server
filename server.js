
// --------------Creating Server Using Express.js----------

const express = require("express");
const app = express();
const db = require('./db')
require('dotenv').config()

const bodyParser = require('body-parser');
app.use(bodyParser.json()) //req.body

// const Person = require('./models/Person.js')
// const MenuItem = require('./models/MenuItem.js')

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Namaskar! Hamare Hotel Me Aapka Swagat Hai");
});


// Person route
const personRoutes = require('./routes/personRuter.js')

//use the router
app.use("/person", personRoutes);


//Menu Route
const menuItemRoutes = require('./routes/menuItemRouter.js')
//use the router
app.use("/menu", menuItemRoutes);


// App Listen
app.listen(PORT, () => {
    console.log("Server is live on port 3000");
    
});