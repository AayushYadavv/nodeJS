/** @format */

const express = require("express");
const prodRouter = express.Router();

const multer = require("multer");

const prodHtml = require("../../views/products/addProducts.js");
const { validProduct, validPrice } = require("../entryValidator.js");
const prodRepo = require("../../repo/product.js");
const prodListHtml = require("../../views/products/productList");
const { validatorMware, authCheck } = require("./middleware");
const upload = multer({ storage: multer.memoryStorage() });
const editProduct = require("../../views/products/editProducts");

prodRouter.get("/admin/products/new", authCheck, (req, res) => {
  res.send(prodHtml({}));
});
prodRouter.post(
  "/admin/products/new",
  authCheck,
  upload.single("image"),
  [validProduct, validPrice],
  validatorMware(prodHtml),
  async (req, res) => {
    const { productname, productprice } = req.body;
    let imageFile = req.file.buffer.toString("base64");
    await prodRepo.create({ productname, productprice, imageFile });
    res.redirect("/admin/products");
  }
);

prodRouter.get("/admin/products", authCheck, async (req, res) => {
  const products = await prodRepo.getAll();

  res.send(prodListHtml({ products }));
});

prodRouter.post("/admin/products/:id/del", authCheck, async (req, res) => {
  await prodRepo.delete(req.params.id);

  res.redirect("/admin/products");
});

prodRouter.get("/admin/products/:id/edit", authCheck, async (req, res) => {
  const product = await prodRepo.findByid(req.params.id);
  if (!product) {
    return res.send("No product Found!");
  }

  res.send(editProduct({ product }));
});

prodRouter.post("/admin/products/:id/edit", authCheck,upload.single("image") ,[
  validProduct,
  validPrice,
],validatorMware(editProduct),async (req,res)=>{
  const {productname,productprice}=req.body;
  console.log(productname,productprice);
  if(req.file){
  let imageFile = req.file.buffer.toString("base64");
  await prodRepo.update({id:req.params.id,productname,productprice,imageFile})
  return res.redirect("/admin/products");
  }
  
  await prodRepo.update({id:req.params.id,productname,productprice})
  res.redirect("/admin/products");
});
module.exports = prodRouter;
