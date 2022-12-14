const express = require('express');
var conn = require('./config/db');
console.log("all is well")
const cors = require("cors");
const app = express();
var path = require('path'); 
var dir = path.join(__dirname, 'images');
// app.use(app.router);
// routes.initialize(app);
const listener = app.listen(process.env.PORT || 12000, '0.0.0.0',() => {
    console.log('Your app is listening on port ' + listener.address().port)
})
conn.connect((err)=>{
    if(err)
    console.log('Database connection Error :'+err);
    else
    console.log('db connect')
});

 app.use(cors());
app.use(express.json()); 
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
var api_prefix='/api'
 
 app.use('/public', express.static('public'));

app.use(api_prefix+'/users',require('./modules/users/user.route'));
app.use(api_prefix+'/cars',require('./modules/cardetails/cardetails.route'));