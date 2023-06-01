const express= require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config() // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`)

app.use(express())

app.listen(5000, ()=> console.log("listening on port 5000"))