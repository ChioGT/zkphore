import express from 'express';
import fs from 'fs';

const app = express();

const readData = () => {
    try{
        const data = fs.readFileSync('./db.json');
        console.log(JSON.parse(data));
    } catch (error){
        console.log(error);
    };    
   
};

const writeData = () => {
    try{
       fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.log(error);
    };    
   
};

app.get("/beneficiarios", (req,res) => {
    const data = readData();
    res.json(data);
});

app.get("/", (req, res) => {
    res.send("Hi! Welcome to my ZKphore API ");
});

app.listen(3001,() => {
    console.log('Server listening on port 3001');
});

