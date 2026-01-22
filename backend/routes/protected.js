const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      msg: "Welcome to dashboard",
      user
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
