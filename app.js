const express = require('express');
const mysql = require('mysql');
const dotenv = require("dotenv");
const path = require("path");
const  app = express();
const hbs = require("hbs");

dotenv.config({
    path:'./.env',
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,

});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Mysql ConnectionSuccess");
    }
});

app.use(express.urlencoded({extended:false}));
// console.log(__dirname);

const location = path.join(__dirname,"./public");
app.use(express.static(location));

app.set("view engine","hbs");

app.use('/',require('./routes/pages'));

app.use('/auth',require('./routes/auth'));

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);


app.listen(5000, () => {
    console.log("Server ready");
});