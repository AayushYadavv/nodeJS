/** @format */

const express = require("express");
const prodRouter = express.Router();

const multer = require("multer");

const prodHtml = require("../../views/products/addProducts.js");
const { validProduct, validPrice } = require("../entryValidator.js");
const prodRepo = require("../../repo/product.js");
// const prodListHtml = require("../../views/products/productList")
const {validatorMware}= require("./validatorMiddleware")
const upload = multer({ storage: multer.memoryStorage() });

prodRouter.get("/admin/product/new", (req, res) => {
  res.send(prodHtml({}));
});
prodRouter.post(
  "/admin/product/new",
  upload.single("image"),
  [validProduct, validPrice],
  validatorMware(prodHtml),
  async (req, res) => {
    console.log(req.body)
    const {productname,productprice} = req.body;
    let imageFile = req.file.buffer.toString("base64");
    await prodRepo.create({productname,productprice,imageFile})
    res.send("Product added")
  }
);

// prodRouter.get("/admin/products", async (req, res) => {
//   const products = await prodRepo.getAll();
//   console.log(products)
//   res.send(prodListHtml({products}))

// });
module.exports = prodRouter;
