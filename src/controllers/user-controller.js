const User = require("../model/User");
const bcrypt = require("bcrypt");
const genToken = require("jsonwebtoken");
const _ = require("lodash");

class UserController {
  // POST register
  registerUser = async (req, res) => {
    const username = req.body.username,
      password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND);

    const checkUser = await User.findOne({ username: username });
    if (checkUser) {
      return res.status(409).json({
        status: false,
      });
    }

    const user = new User({
      username: username,
      password: hashPassword,
    });
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(503).json({ status: false });
    }

    return res.status(200).json({
      status: true,
      data: {
        user: savedUser,
      },
    });
  };

  //POST login
  login = async (req, res) => {
    const username = req.body.username,
      password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ status: false });
    }
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(404).json({ status: false });
    }

    const jwt = genToken.sign({ id: user.username }, process.env.JWT_SECRET);
    return res.status(200).json({
      status: true,
      data: {
        jwt: jwt,
        user: _.omit(user.toObject(), ["password"]),
      },
    });
  };

  //PUT update user
  updateUser = async (req, res) => {
    const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    console.log(oldPassword, newPassword);
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ status: "false" });
    console.log(user);
    const validatePassword = await bcrypt.compareSync(
      oldPassword,
      user.password
    );
    console.log(validatePassword);
    if (!validatePassword) return res.status(401).json({ status: false });

    const hashPassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUND);
    const updated = await User.findOneAndUpdate(
      { username: username },
      { password: hashPassword }
    );
    if (!updated) return res.status(503).json({ status: false });
    return res.status(200).json({
      status: true,
      data: {
        user: _.omit(user.toObject(), ["password"]),
      },
    });
  };
}

module.exports = new UserController();
