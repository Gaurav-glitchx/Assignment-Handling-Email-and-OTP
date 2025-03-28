require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OTP expiry set to ${process.env.OTP_EXPIRY_MINUTES} minutes`);
});