import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', '..', 'sourcemaps', 'temp');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('File is required');
  }

  const projectId = req.body.projectId;
  const version = req.body.version;

  if (!projectId || !version) {
    fs.unlinkSync(req.file.path);
    return res.status(400).send('Project ID and version are required');
  }

  const dir = path.join(__dirname, '..', '..', 'sourcemaps', projectId);
  fs.mkdirSync(dir, { recursive: true });

  const newFilename = `${version}.js.map`;
  const newPath = path.join(dir, newFilename);

  fs.renameSync(req.file.path, newPath);

  res.send('Sourcemap uploaded successfully');
});

export { router as sourcemapRoutes };