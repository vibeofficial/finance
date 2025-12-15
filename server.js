const app = require('./app');
const PORT = process.env.PORT || 1234;

// app.use((error, req, res, next) => {
//   console.log(error)
// })

app.listen(PORT, () => {
  console.log(`Server is listening to Port: ${PORT}`);
});