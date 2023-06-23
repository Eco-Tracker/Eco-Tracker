const express = require('express');
const app = express();
const dotenv = require('dotenv')
const users = require("./routes/proUsers")
const event = require("./routes/events")
const user = require("./routes/users")
const post = require("./routes/post")
const comment = require("./routes/comments")
const challanges = require("./routes/challanges")
const userChallange = require("./routes/userChallange")
const cors = require("cors")

dotenv.config() // Load the environment variables
console.log(`The connection URL is ${ process.env.DATABASE_URL}`)

app.use(express());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/proUsers", users);
app.use("/post", post)
app.use("/users", user);
app.use("/event", event);
app.use("/comment", comment);
app.use("/challanges", challanges)
app.use("/userChallenge", userChallange)
app.listen(5000, () => console.log("listening on port 5000"))
const main = () => { console.log("connect to prisma") }

main()