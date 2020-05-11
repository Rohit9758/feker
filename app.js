/*
 * Author: Rohit Bhure
 * Date : 10/03/2020
 * Useability: Server Startup and checking the database connection
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting mongo
mongoose.connect(
    "mongodb://localhost:27017/userdb", { useNewUrlParser: true, useUnifiedTopology: true  }
);

// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
}); 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

const userRoutes = require('./api/routes/users');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet.hidePoweredBy());

app.use('/users', userRoutes);
  
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.set('port', process.env.PORT || 9001);

try {
    console.log("here ")
    app.listen(app.get('port'), function () {
        console.log('Listening on port 9001...');
    })
} catch(err){
    console.log("Error in Dbconnection",err)
}
