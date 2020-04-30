/** @format */

const express = require("express");
const router = express.Router();
const signinHtml = require("../../views/admin/signin.js");
const signupHtml = require("../../views/admin/signup.js");

const userRepo = require("../../repo/user.js");
const { validatorMware } = require("./validatorMiddleware");
const {
  requireEmail,
  requirePassword,
  confirmPassword,
  emailExist,
  signinEmailCheck,
  signinPassCheck,
} = require("../entryValidator.js");

router.get("/", async (req, res) => {
  if (req.session.uid) {
    const user = await userRepo.findByid(req.session.uid);
    res.send(`Welcome ! ${user["email"]}`);
  } else {
    res.send("please login");
  }
});

router.get("/signup", (req, res) => {
  res.send(signupHtml({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, confirmPassword, emailExist],
  validatorMware(signupHtml),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepo.create({ email, password });
    req.session.uid = user.id;

    res.send("Account Created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("Signed out succesfully");
});

router.get("/signin", (req, res) => {
  res.send(signinHtml({}));
});

router.post(
  "/signin",
  [signinEmailCheck, signinPassCheck],
  validatorMware(signinHtml),
  async (req, res) => {
    console.log("err1");
    const { email} = req.body;
    console.log("err1");
    const user = await userRepo.findOneBy({ email });
    console.log("err1");
    req.session.uid = user.id;
    res.send("Succesfully Signed in");
  }
);

module.exports = router;
