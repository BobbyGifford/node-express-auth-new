const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/current_user", requireAuth, function(req, res) {
    const current_user = {
      _id: req.user._id,
      email: req.user.email
    };
    res.json({ user: current_user });
  });
};
