const express = require("express");
const bodyParser = require("body-parser");
const  {Client, Connection} = require("pg");
const _ = require("lodash");
const { func, string } = require("joi");
const { intersection, result } = require("lodash");
const { STRING } = require("sequelize");
const pgp = require("pg-promise");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const client = new Client({
    host: "localhost",
    port:process.env.port||5432,
    user:"postgres",
    password:""password,
    database:" "
})

// client.connect();

// sync javascript
var object =[{
    name:string,
    arr: []
}];

app.get("/",function(req,res) {
    res.redirect("/");
});

app.post("/",function (req,res){
res.redirect("login");

});

app.get("/login",function (req,res){
    res.redirect("login");
});

app.post("/login",function (req,res) {
    client.connect() 
        // if(err);
        // res.status(404).send('sorry cannot find tha');
        // else{
            var auth={
                "USERNAME" : req.body.username,
                "PASSWORD" :req.body.password
                }
        client.query("SELECT * FROM auth WHERE USERNAME=auth.username and PASSWORD = auth.password",(result) => {
                if (result.length == 0)
                    res.redirect("login");
                else{
                    client.end();
                    res.redirect("events");
                }
            }
            
    );
    
});

app.get("/register",(req, res) => {
        client.connect(
            client.query('SELECT COUNT(*) FROM auth', function (result) {
                if (result == 0)
                    res.redirect(register);
                else {
                    res.send("already registered");
                    res.redirect(login);
                }
            })
        );

    });



app.post("/register",function(req,res){

    var auth={
    "USERNAME" : req.body.username,
    "PASSWORD" :req.body.password
    }
    client.connect() 
    .then(()=>client.query("INSERT INTO auth SET ($1,$2)",[auth.USERNAME,auth.PASSWORD])
    .catch(err => console.log(err))
    .then(client.end()))
    .finally(res.redirect(events))
    

});

app.get("/events",function(req,res){
  
  client.connect()
      .then(()=>client.query("SELECT * FROM events"))
      .catch(err => console.log(err),res.redirect(login))
      .then(result=>//console.table(result.rows),
        object.string=result.name,
        object.cars=result.user_id
        //    for (let i = 0; i < result.rows.length; i++) {
        //        EVENTS[i].id=result.rows[i].ID;
        //        EVENTS[i].name=result.rows[i].NAME;
        //        for (let j = 0; j < result.rows[i].USER_ID.length; j++) {
        //            EVENTS[i].arr_events[j]=result.rows[i].USER_ID[j];
        //          }
        //     }

        //     //PRINT THE EVENTS ARRAY
        //     for (let i = 0; i < EVENTS.length; i++) {
               
                
        //     }
       
          
       ).finally(()=>client.end());


      
    res.render("list",{name:object.string,ids:object.arr});

});

  app.get("/delete",function(req,res){
      res.redirect("delete");
  });

  app.post("/delete",function (req,res) {
    var name_q = req.body.fname;
    client.connect()
    .then(()=>"DELETE FROM EVENTS WHERE name=name_q")
    .catch(err=>console.log(err))
    .then(()=>client.end())
    .finally(res.redirect("deleted_after"))  
  });
 

  app.get("/deleted_after",function (req,res) {
      res.redirect("deleted_after");
  });
  
  app.post("/deleted_after",function (req,res) {
      res.redirect("events");
  });
  



   const port = process.env.PORT||3000; 
app.listen(port,function(req,res){
    console.log("server is running");
})