const { 
    admin
} = require('../config/firebase.config');

class FirebaseAuthController {
    isLoggedIn(req, res) {
      const idToken = req.headers.authorization;

      if (!idToken || !idToken.startsWith('Bearer ')) {
          return res.status(401).json({ message: "User is not logged in" });
      }

      const token = idToken.split(' ')[1];

      admin.auth().verifyIdToken(token, true)
          .then((decodedToken) => {
              const uid = decodedToken.uid;
              res.status(200).json({ message: "User is logged in", uid });
          })
          .catch((error) => {
              console.error("Error verifying token:", error);
              res.status(401).json({ message: "Invalid token, user is not logged in" });
          });
    }
}

module.exports = new FirebaseAuthController();