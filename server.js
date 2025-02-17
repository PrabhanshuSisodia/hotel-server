
// --------------Creating Server Using Express.js----------

const express = require("express");
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()) //req.body

// const Person = require('./models/Person.js')
// const MenuItem = require('./models/MenuItem.js')


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
app.listen(3000, () => {
    console.log("Server is live on port 3000");
    
});