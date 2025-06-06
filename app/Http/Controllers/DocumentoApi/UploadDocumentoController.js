const path = require('path');
const fs = require('fs');
const { Documento } = require('../../../Model');

module.exports = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado.' });
    }

    // Garante que o diretório existe
    const storageDir = path.resolve(__dirname, '../../../../storage/documents');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    // Salva o arquivo
    const fileName = Date.now() + '-' + req.file.originalname;
    const filePath = path.join(storageDir, fileName);
    fs.writeFileSync(filePath, req.file.buffer);

    // Salva no banco de dados
    const documento = await Documento.create({
      documento: fileName,
      id_user: req.user.id
    });

    return res.status(201).json({
      message: 'Upload realizado com sucesso!',
      documento
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer upload do documento.' });
  }
};
