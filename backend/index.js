const express= require('express');
const app = express();
const dotenv = require('dotenv')
const users = require("./routes/proUsers")
const event = require("./routes/events")
const user = require("./routes/users")
const cors=require("cors")

dotenv.config() // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`)

app.use(express());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/proUsers", users);
app.use("/users",user)

app.listen(5000, ()=> console.log("listening on port 5000"))
const main=()=>{ console.log("connect to prisma")}

main()