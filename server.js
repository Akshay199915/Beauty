const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// routes//
const userRoutes = require('./server/routes/users');
const servicesRoutes = require('./server/routes/services');
const bookingRoutes = require('./server/routes/bookings');

const port = 3000;

const app = express();

app.use(cors({origin:"*"}));
app.use(express.static(path.join(__dirname, 'dist/beautyApp/')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/service/', servicesRoutes);
// app.use('/api/v1/booking/', bookingRoutes);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'dist/beautyApp/index.html'));
});

app.listen(port, ()=>{
    console.log("server on port:", port);
})