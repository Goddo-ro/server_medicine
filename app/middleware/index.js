const { admin } = require("../config/firebase.config");

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    if (!idToken || !idToken.startsWith("Bearer ")) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const token = idToken.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token); 
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyToken;
