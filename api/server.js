require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./user");
const { indoorRouter } = require("./indoor");
const { spotifyRouter } = require("./spotify");
const { outdoorRouter } = require("./outdoor");

const app = express();
const port = 8080;

const apiRouter = express.Router();

app.use("/api", apiRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/indoor", indoorRouter);
apiRouter.use("/spotify", spotifyRouter);
apiRouter.use("/outdoor", outdoorRouter);

// Use express middleware and routes here
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Listen inside the MongoClient connect callback
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});