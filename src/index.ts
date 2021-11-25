import express from 'express'
import path from 'path'
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'pub')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pub/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
