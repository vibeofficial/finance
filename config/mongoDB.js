const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI
mongoose.connect(DB).then(() => {
  console.log('Connected to Database')
}).catch((error) => {
  console.log('Error connecting to Database:', error.message)
})