const jwt = require('jsonwebtoken');
const SECRET = 'admin'; 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuarioId = decoded.id; // Certifique-se de que o payload do token contém `id`
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
};
