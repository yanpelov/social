const { firebaseConfig } = require('firebase-functions');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebrrrrase!");
});

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