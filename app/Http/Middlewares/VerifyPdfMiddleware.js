// Middleware para verificar se o arquivo enviado é PDF
module.exports = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  // Verifica se o mimetype é PDF
  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Apenas arquivos PDF são permitidos.' });
  }

  next();
};
