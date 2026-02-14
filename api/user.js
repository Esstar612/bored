const express = require("express");
const {client} = require("./db")
const database = "BoredDB"
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
  const userInfo = req.body;

  try {
    const existingUser = await client.db(database).collection("users").findOne({ email: userInfo.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const userObj = getUserObj(userInfo);
      const insertResult = await client.db(database).collection("users").insertOne(userObj);
      console.log(insertResult);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "User registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await client.db(database).collection("users").findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

const getUserObj = ({
                      firstName,
                      lastName,
                      email,
                      profileImageUrl,
                      dateOfBirth,
                      password,
                    }) => ({
  firstName,
  lastName,
  email,
  profileImageUrl,
  dateOfBirth,
  password,
});

module.exports = {
  userRouter
};