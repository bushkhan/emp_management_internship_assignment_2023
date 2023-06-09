const express = require('express');
const app = express();
const port = 3000;

const mysql = require("./connection").con
//configuration


app.set("view engine", "hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))


// app.use(express.urlencoded());
// app.use(express.json());
//Routing
app.get("/",(req, res) => {
    res.render('index')
});
app.get("/add",(req, res) => {
    res.render('add')
});

app.get("/search",(req, res) => {
    res.render('search')
});

app.get("/update",(req, res) => {
    res.render('update')
});

app.get("/delete",(req, res) => {
    res.render('delete')
});

app.get("/view",(req, res) => {
    res.render('view')
});



app.get('/addemployee', (req, res) => {
    //fetching data
    const {id, name, email, role, address, city, contact} = req.query;

    //sanitization XSS...
    let qry = "select * from emp_details where emp_id=? or emp_email=?";
    mysql.query(qry, [id, email], (err, results) => {
        
        if(err){
            throw err
        }
        else{
            if(results.length > 0){
                res.render("add", {checkmsg: true})

            } else {
                //insert query
                let qry2 = "insert into emp_details values(?,?,?,?,?,?)";
                mysql.query(qry2, [id,name,role,email,address,city], (err, results2)=>{
                    
                    if(results2.affectedRows > 0){
                        res.render("add", {msg: true})

                    }
                });
            }
        }
    })

    //Relationship of both ids
    let qrya = "select * from emp_details where emp_id=? or emp_email=?";
    mysql.query(qry, [id, email], (err, results) => {
        
        if(err){
            throw err
        }
        else{
            if(results.length > 0){
                res.render("add", {checkmsg: true})

            } else {
                //insert query
                let qry2 = "insert into contact_details values(?,?)";
                mysql.query(qry2, [id,contact], (err, results2)=>{
                    
                    if(results2.affectedRows > 0){
                        res.render("add", {msg: true})

                    }
                });
            }
        }
    })
});


app.get("/searchemployee", (req,res)=> {
    //fetch data from form
    const {id} = req.query;

    let qry = "select * from emp_details where emp_id=?";
    mysql.query(qry, [id], (err, results) => {
        if(err){
            throw err;
        } else{
            if(results.length > 0){
    
                res.render("search", {mesg1:true, mesg2: false});
            }else{
                res.render("search", {mesg1:false, mesg2: true});
            }
        }
    });
});

app.get("/updatesearch", (req, res) => {
    const {id} = req.query;

    let qry = "select * from emp_details where emp_id=?";
    mysql.query(qry, [id], (err, results) => {
        if(err){
            throw err;
        } else{
            if(results.length > 0){
    
                res.render("update", {mesg1:true, mesg2: false, data: results});
            }else{
                res.render("update", {mesg1:false, mesg2: true});
            }
        }
    });
});

app.get("/updateemployee", (req,res) => {
    const { id, name, address, city } = req.query;
    let qry = "update emp_details set emp_name=?, emp_addr=?, emp_city=? where emp_id=? ";

    mysql.query(qry, [name, address, city, id], (err,results3) => {
        if(err){
            throw err;
        } else{
            console.log(results3.affectedRows);
            if(results3.affectedRows > 0){
                res.render("update", {newmsg: true})

            }
            else{
                console.log("error")
            }
        }
    });

});


app.get("/deleteemployee", (req,res) => {

    const {id} = req.query;

    let qry = "delete from emp_details where emp_id=?";
    mysql.query(qry, [id], (err, results) => {
        if(err){
            throw err;
        } else{
            if(results.affectedRows > 0){
    
                res.render("delete", {mesg1:true, mesg2: false, data: results});
            }else{
                res.render("delete", {mesg1:false, mesg2: true});
            }
        }
    });
})

//Server
app.listen(port,(err)=>{
    if (err) 
        throw err;
    else
        console.log("Server is running at port: %d", port);
});