import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import errorRoutes from './routes/errors';

const app = express();
const PORT = process.env.PORT || 8080;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/errors', errorRoutes);

// ... other routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});