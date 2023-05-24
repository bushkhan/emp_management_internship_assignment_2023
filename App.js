const express = require('express');
const app = express();
const port = 3000;
//configuration

//Routing
app.get("/",(req, res) => {
    res.send("hello");
});

//Server
app.listen(port,(err)=>{
    if (err) 
        throw err;
    else
        console.log("Server is running at port: %d", port);
});