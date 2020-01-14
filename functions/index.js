const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.getAllItems = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection("items").get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  response.json({ items });
});
