const jwt = require('jsonwebtoken');

// Middleware de autenticação JWT
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  try {
    // Troque 'seu_segredo' pelo segredo real do seu JWT
    const decoded = jwt.verify(token, 'seu_segredo');
    req.user = {
      id: decoded.id,
      email: decoded.email,
      nome: decoded.nome
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
