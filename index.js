// Import express
let express = require('express');
//import env vars
// let {node_env, port, dbConnect} = require('./config/dev.js/index.js');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
//  Import Cors
var cors = require('cors')
// Import routes
let apiRoutes = require("./api-routes")
//  use cors
app.use(cors())
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
// console.log(process.env.PORT)
// import GCP metadata
let gcpUtils = require("./controllers/gcpController");
console.log(gcpUtils)
// TODO resolve gcp before continuing (async)
const gcpData = gcpUtils.gcp();



// TODO assign metadata to consts
let port = process.env.PORT ?  process.env.PORT : 8080;
// set env vars from dotenv
// dotenv.config();

app.use(bodyParser.json());
// Connect to Mongoose and set connection variable, db name can be added to env variable here
// mongoose.connect(process.env.dbConnect);
// var db = mongoose.connection;
// console.log("db", db)
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});