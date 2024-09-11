import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import errorRoutes from './routes/errors';
import { initializeDatabase } from './datasource';
import cors from 'cors';
import { sourcemapRoutes } from './routes/sourcemaps';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/errors', errorRoutes);
app.use('/api/sourcemaps', sourcemapRoutes);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
});