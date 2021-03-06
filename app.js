const express = require("express");
const app = express();
const fs = require('fs');
const port = 3000
app.use(express.json());
const url = "mongodb://127.0.0.1:27017";
const dbName = "TWI";
// const collectionName1 ="w_nodes";
// const collectionName2 ="w_edges";
const collectionName3 = "th_final";
const collectionName4 = "new_data";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
let collection_nodes;
let collection_edges;
let collection_final_list;
let new_final_list;

client.connect(function(err){
    if (err) throw err;
    console.log("connected to db");
    db = client.db(dbName);
    // collection_nodes=db.collection(collectionName1);
    // collection_edges=db.collection(collectionName2);
    collection_final_list=db.collection(collectionName3);
    new_final_list= db.collection(collectionName4);
})


app.use(express.static('graph'));


app.listen(port,()=>{console.log("Server is running"+port)});

app.get('/index',function(req,res){
    fs.readFile("graph/index.html",(err,data)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(data);
    })
})

app.get('/d3',function(req,res){
    fs.readFile("graph/d3/index.html",(err,data)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(data);
    })
})

app.post("/getefd",(req,res)=>{
    let week = req.body.week;
    let user = req.body.user;
    var query = {"user":user};
    collection_final_list.find({'week':week},{}).limit(500).toArray(function(e,r){
        if(e) throw e;
        res.send(r);
    })
})

app.post("/getdata",(req,res)=>{
    new_final_list.find({},{}).limit(500).toArray(function(e,r){
        if(e) throw e;
        res.send(r);
    })
})




