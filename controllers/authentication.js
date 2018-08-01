const User = require("../models/user");
const jwt = require("jwt-simple");
const devKeys = require("../config/dev");

function token(user) {
  // sub mean subject
  // iat is issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, devKeys.secret);
}

exports.signin = function(req, res, next) {
  res.json({ token: token(req.user) });
  console.log(req.user);
};

exports.signup = function(req, res, next) {
  // Check if user with email exists
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).json({ error: "Must provide email and password." });
  }

  User.findOne({ email: email }, function(err, existinguser) {
    if (err) {
      return next(err);
    }

    if (existinguser) {
      return res.status(422).json({ error: "Email is in use" });
    }
    // Saves user if new and valid
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: token(user) });
    });
  });
};
