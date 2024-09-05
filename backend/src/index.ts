import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Error Monitoring Platform API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
