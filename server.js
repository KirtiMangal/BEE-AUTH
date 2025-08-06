import express from "express";
import session from "express-session";
const app= express();
app.use(express.json());


app.use(session({
    secret:"my_secretkey",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60000}//1min
}));

app.post("/login",(req,res)=>{
    const{username,password}=req.body;
    if(username==="admin"&&password==="123456"){
        req.session.username=username;
        return res.send("Login successful");
    }
      res.status(401).send("Invalid Credentials");
});


app.get("/dashboard",(req,res)=>{
    if(req.session.username){
        return res.send(`Welcome ${req.session.username}`);

    }
    res.status(401).send("Invalid Credential..")
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});