/** @format */
const userRepo = require("../repo/user.js");
const { check, validationResult } = require("express-validator");

module.exports = {
  requireEmail: check("email").trim().normalizeEmail().isEmail(),
  requirePassword: check("password").trim().isLength({ min: 5, max: 10 }),
  confirmPassword: check("confirm-password")
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage("must be between and 10")
    .custom(async(value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password dont match");
      }
     
    }),
  emailExist: check("email")
    .trim()
    .custom(async (email) => {
      if (await userRepo.findOneBy({ email })) {
        throw new Error("Email already Exist");
      }
    }),
  signinPassCheck: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const user = await userRepo.findOneBy({ email });
      if (!user) {
        throw new Error("Invalid password");
      }
      const validUser = await userRepo.passvalidator(password, user.password);

      if (!validUser) {
        throw new Error("Invalid password");
      }
      return true;
    }),
  signinEmailCheck: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const user = await userRepo.findOneBy({ email });
      if (user == false) {
        throw new Error("Email doesnot Exist");
      }
    }),
  validProduct: check("productname").trim().isLength({min:2}).withMessage("Enter a valid Product Name more than 2 character"),
  validPrice :check("productprice").toFloat().isFloat({min:1}).withMessage("Price should be more than 1")
};
