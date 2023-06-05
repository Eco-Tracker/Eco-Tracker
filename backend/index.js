const express= require('express');
const app = express();
const dotenv = require('dotenv')
// const users = require("./routes/proUserRoutes")

dotenv.config() // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`)

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/proUsers", users);

app.listen(5000, ()=> console.log("listening on port 5000"))
const main=()=>{ console.log("connect to prisma")}

main()