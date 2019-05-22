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
console.log("process.env1", process.env.PORT)
if(!process.env.PORT){
    async function gcpData(){
        var myData = await gcpUtils.gcp();
        if (myData){

            process.env.OPT = {
                user: myData.DBUSER,
                pass: myData.DBPASS,
                auth: {
                    authdb: myData.DBAUTH,
                }
            };
        
            process.env.DBHOST = myData.DBHOST
            process.env.DBNAME = myData.DBNAME
            process.env.DBPORT = myData.DBPORT
            
            var connection = mongoose.createConnection(config.database.host, 'mydatabase', config.database.port, opt);
            process.env.PORT = myData.PORT;
            process.env.DBCONNECT = myData.DBCONNECT.toString();
            console.log("process.env.Port", process.env.PORT)
        // TODO assign metadata to consts
        let port = process.env.PORT ?  process.env.PORT : 8080;
        // set env vars from dotenv
        // dotenv.config();
        
        app.use(bodyParser.json());

        // Connect to Mongoose and set connection variable, db name can be added to env variable here
        mongoose.connect(process.env.DBCONNECT, {useNewUrlParser: true}).catch(error =>{
            console.log("mongoError", error);
        });

        var db = mongoose.connection;

        // Send message for default URL
        app.get('/', (req, res) => res.send('Hello World with Express'));
        // Use Api routes in the App
        app.use('/api', apiRoutes)
        // Launch app to listen to specified port
        app.listen(port, function () {
            console.log("Running RestHub on port " + port);
        });
        
        }else{
            console.log("No ENV vars or GCP available")
        }
     }
     gcpData();

}


var opt = {
    user: config.username,
    pass: config.password,
    auth: {
        authdb: 'admin'
    }
};

var connection = mongoose.createConnection(config.database.host, 'mydatabase', config.database.port, opt);


