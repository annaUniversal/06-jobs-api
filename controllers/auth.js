const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // can do validation vis mangoos in the controller dirrectly
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, password, and email");
  // }

  const user = await User.create({ ...req.body });
  //const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
  //   expiresIn: "30d",
  // }); //user.createJWT()

  console.log("test");
  console.log("name ", user.name);
  const token = user.createJWT();
  // const token = user.createJWT();
  console.log("token ", token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide password, and email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("The access is not authorised");
  }

  const isPasswordCorrect =await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("The access is not authorised");
  } 

  //comparing password
  
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
