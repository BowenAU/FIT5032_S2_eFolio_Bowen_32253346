/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error);
      res.status(500).send("Server Error counting books.");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = await admin.firestore().collection("books").get();
      console.log("book collections snapshot", booksCollection);
      const response = [];
      booksCollection.forEach((doc) => {
        response.push({...doc.data()});
      });
      res.status(200).send({response});
    } catch (error) {
      console.error("Error get books:", error);
      res.status(500).send("Server Error get all books.");
    }
  });
});


exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;
      await admin.firestore().collection("books").add({isbn: isbn, name: name.toUpperCase()});
      res.status(200).send("Book added successfully!");
    } catch (error) {
      console.error("Error counting books:", error);
      res.status(500).send("Server Error add books.");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
