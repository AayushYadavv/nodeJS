const express = require("express")
var cookieSession = require('cookie-session')
const bodyParser = require("body-parser")
const authRoute= require("./routes/admin/auth.js");
const prodRoute = require("./routes/admin/products.js");
const prodDisplay = require("./routes/products") 

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({keys:["jfskdnvmkdf"]}));

app.use(authRoute);
app.use(prodRoute);
app.use(prodDisplay);


app.use(express.static(__dirname+'/public'))




app.listen(3000);