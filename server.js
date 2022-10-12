const mongoose = require('mongoose');

const app = require('./app');

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(console.log('Database connection successful'))
  .catch(({ message }) => {
    console.log(message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
