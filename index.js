const app = require('./app');
app.listen(5000,function () {
    console.log("Application is running......");
})

//Heroku Env Setup
// const app = require('./app');
// const PORT = process.env.PORT || 8080;
// app.listen(PORT,function () {
//     console.log("Application is running......"+PORT+" Port ");
// })

// Allow requests from a specific origin (e.g., http://localhost:3000)
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
