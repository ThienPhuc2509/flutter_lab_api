const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const db = require("./config/mongo-connection");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const initRouter = require("./routes/index");
const morgan = require("morgan");
const io = require("socket.io")(server);
require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("combined"));

initRouter(app);
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
