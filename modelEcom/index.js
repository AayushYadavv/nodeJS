const express = require("express")
var cookieSession = require('cookie-session')
const bodyParser = require("body-parser")
const authRoute= require("./routes/admin/auth.js");
const prodRoute= require("./routes/admin/products.js");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({keys:["jfskdnvmkdf"]}));

app.use(authRoute);
app.use(prodRoute);


app.use(express.static('public'))




app.listen(3000);