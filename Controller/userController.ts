const userModel = require("../Models/userModels.ts");
// const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id: any) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res.status(400).json("user with given email already exist...");

    if (!name || !email || !password)
      return res.status(400).json("All fields are required");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be valid");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("password must be strong");

    user = new userModel({ name, email, password });

    // const salt = await bcrypt.genSalt(10);

    // user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status("400").json("Invalid email or password...");

    if (!(password === user.password))
      return res.status("400").json("Invalid email or password...");

    const token = createToken(user._id);
    res.status(200).json({ _id: user.id, name: user.name, email, token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

const findUser = async (req: any, res: any) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(400).json("User not exist...");

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

const getUsers = async (req: any, res: any) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
