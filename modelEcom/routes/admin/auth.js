/** @format */

const express = require("express");
const router = express.Router();
const signinHtml = require("../../views/admin/signin.js");
const signupHtml = require("../../views/admin/signup.js");

const userRepo = require("../../repo/user.js");
const { validatorMware, authCheck } = require("./middleware");
const {
  requireEmail,
  requirePassword,
  confirmPassword,
  emailExist,
  signinEmailCheck,
  signinPassCheck,
} = require("../entryValidator.js");

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
    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.redirect("/admin/products");
});

router.get("/signin", (req, res) => {
  res.send(signinHtml({}));
});

router.post(
  "/signin",
  [signinEmailCheck, signinPassCheck],
  validatorMware(signinHtml),
  async (req, res) => {
    const { email } = req.body;
    const user = await userRepo.findOneBy({ email });
    req.session.uid = user.id;
    res.redirect("/admin/products");
  }
);

module.exports = router;
