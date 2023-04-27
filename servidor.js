const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();

// Configuración de Multer para gestionar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para procesar la imagen
app.post('/procesar-imagen', upload.single('imagen'), async (req, res) => {
  try {
    const { buffer } = req.file;
    const resultado = await Tesseract.recognize(buffer, 'spa');
    const texto = resultado.data.text;
    res.json({ texto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la imagen' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
