const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// 1) START SERVER
app.listen(process.env.PORT || 8000, () => {
  console.log(
    `App running on port ${process.env.PORT}...`
  );
});
