const express = require('express');
const multer = require('multer');
const JwtAuthMiddleware = require('./app/Http/Middlewares/JwtAuthMiddleware');
const VerifyPdfMiddleware = require('./app/Http/Middlewares/VerifyPdfMiddleware');
const UploadDocumentoController = require('./app/Http/Controllers/DocumentoApi/UploadDocumentoController');

const app = express();
const upload = multer();

app.post(
  '/api/documentos/upload',
  JwtAuthMiddleware,
  upload.single('file'),
  VerifyPdfMiddleware,
  UploadDocumentoController
);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
