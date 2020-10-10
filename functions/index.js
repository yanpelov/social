const { firebaseConfig } = require('firebase-functions');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebrrrrase!");
});

app.get('/screams',async (req,res)=>{
    functions.logger.info("grabScreens",{structuredData: true});



    const screensRef = admin.firestore().collection('screens');
    try{
    const docs = await screensRef.get();
    let screams = [];
    docs.forEach(doc => {
        screams.push(doc.data());
    });

    return res.json(screams);
}
catch(e){
    console.error(e);
}
})

exports.grabScreens = functions.https.onRequest(async (req,res)=>{
    functions.logger.info("grabScreens",{structuredData: true});



    const screensRef = admin.firestore().collection('screens');
    try{
    const docs = await screensRef.get();
    let screams = [];
    docs.forEach(doc => {
        screams.push(doc.data());
    });

    return res.json(screams);
}
catch(e){
    console.error(e);
}
})

exports.createScream = functions.https.onRequest(async (req,res)=>{

    if(req.method !== 'POST'){
        return res.status(400).json({message:'method not allowed'})
    }
    const request = req.body;
    
    functions.logger.info("createScream",{structuredData: true});
    const screensRef = admin.firestore().collection('screens');
    try{
        
        let data = {
            userHandle: request.userHandle,
            body: request.body,
            createAt: admin.firestore.Timestamp.fromDate(new Date(request.createAt))
        }
    const newDoc = await screensRef.add(data);
    return res.json({message: `document ${newDoc.id} created `});
}
catch(e){
    console.error(e);
    res.status(500).json({error: `something went wrong`})
}
})

exports.api = functions.https.onRequest(app);