const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const auth = require('./routes/auth')
const user = require('./routes/user')
const conversation = require('./routes/conversation');
const message = require('./routes/message')


//connecting to mongodb
// mongoose.connect(process.env.MONGO_STRING)
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);


const app = express();

app.get('/',()=>{
    console.log('hello')
})

//middleware
app.use(cors())
app.use(express.json());
app.use('/auth', auth);
app.use('/user', user);
app.use('/conversation', conversation);
app.use('/message', message);

// app.listen(8000, ()=>{
//     console.log('server started')
// })

client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(8000, () => {
        console.log("listening for requests");
    })
});
