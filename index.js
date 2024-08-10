import express from 'express';
import { Identity, Group, generateProof, verifyProof } from '@semaphore-protocol/core';
import fs from 'fs';

const app = express();

//array of semaphore identity of all beneficiaries
var beneficiaries = [];

//array of groups / airdrops
var airdrops = [];

//create a new semaphore deterministic identity
const newIdentity = (secret) => {
    const deterministicIdentity = new Identity(secret);
    console.log("Deterministic Identity: ",deterministicIdentity);
};

//create a new semaphore group
const newGroup = () => {
    // array of members to add to the group
    let members = [];
    for (let x=0; x < 5; x++){
        let idanon = new Identity(toString(x));
        beneficiaries.push(idanon);
        members.push(idanon.commitment);
    }; 
    const group = new Group(members);
    airdrops.push(group);
    console.log("Group size: ", group.members.length);
    console.log("The all group: ", group);
};

//Generate and Verify the Proof
const proofAndVerify = async() => {  
    try {
        //proof
        const group = airdrops[0];
        // scope to prevent double signaling
        const scope = group.root;
        const message = 1;

        //generate the proof
        const proof = await generateProof(beneficiaries[0],group,message,scope);
        
        //verify the proof
        const verified = await verifyProof(proof);

        console.log("Proof verified: ", verified);
    } catch (error){
        //console.log("Proof and Verify error: ", error)
        console.log("Proof verified: False");
    };
    
};

newGroup();

proofAndVerify();

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

