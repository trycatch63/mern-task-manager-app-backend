// const app = require('./app');
// app.listen(5000,function () {
//     console.log("Application is running......");
// })

//Vercel Environment Setup
const app = require('./app');
const PORT = process.env.PORT || 8080;
app.listen(PORT,function () {
    console.log("Application is running......"+PORT+" Port ");
})

