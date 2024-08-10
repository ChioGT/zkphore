import express from 'express';
import { Identity, Group } from '@semaphore-protocol/core';
import fs from 'fs';

const app = express();

const newIdentity = (secret) => {
    const deterministicIdentity = new Identity(toString(secret));
    console.log("Deterministic Identity: ", deterministicIdentity);
};

const newGroup = () => {
    // array of members to add to the group
    const members = [];
    for (let x=0; x < 5; x++){
        let ide = newIdentity(toString(x));
        members.push(ide("_commitment"));
    }; 
    const group = new Group(members);
    console.log("Group size: ", group.members.length);
};

newIdentity("secreto");

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

