const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 8080;
const conn_str = 'mongodb+srv://aledevme:c8ldcUVgi9Sh1pZf@cluster0.5v234.mongodb.net/jwt-project?retryWrites=true&w=majority'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./routes/user')

app.use('/users', userRouter)


//create a server object:
app.listen(port, () => {
    const connection =  mongoose.connect(conn_str,{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },(err) => {
            if (err) {
                console.log("error in connection");
            } else {
                console.log("mongodb is connected");
            }
        }
    );

    if(connection) console.log('api')
}); 