const express = require("express"); // invoke the express to use it
const cors = require("cors"); // cors will allow us to communicate with frontend
const mongoose = require("mongoose"); // it will help us to connect with mongodb
const userRouter = require("./Routes/userRoute.ts");
const ChatRouter = require("./Routes/ChatRoute.ts");
const MessageRouter = require("./Routes/MessageRoute.ts")


const app = express(); // create app and initialize express

require("dotenv").config(); // this will config .env file

const uri = process.env.ATLAS_URI;

app.use(express.json()); // it is middleware function, it will help to use json data i.e. recieve and send json data

app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/messages", MessageRouter);

app.get("/", (req, res) => {
  res.send("Welcome our Chatbox APIs");
});
const ipAdress = process.env.IPADRESS;
const port = process.env.PORT || 5000;

app.listen(port, ipAdress, (req, res) => {
  // this will listen the port and it will take two arguments request and response
  console.log(`sever running on port... :${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((error) =>
    console.log("MonoDb connection failed:", error.message)
  );
