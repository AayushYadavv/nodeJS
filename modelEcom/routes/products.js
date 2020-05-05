/** @format */

const express = require("express");
const prodDisplay = express.Router();

const prodRepo = require("../repo/product");
const cartRepo = require("../repo/cart")
const prodDisplayHtml = require("../views/products/productDisplay")
const cartHtml = require("../views/cart");
prodDisplay.get("/", async (req, res) => {
    if(!req.session.cartId){
     req.session.cartId=cartRepo.randomise();
    }
    const products = await prodRepo.getAll();
    res.send(prodDisplayHtml({products}))
});

prodDisplay.post("/products/:pid/cart",async (req,res)=>{
   
    await cartRepo.addProductToCart({cartId:req.session.cartId,productId:req.params.pid})
    res.redirect("/")
})

prodDisplay.get("/cart",async(req,res)=>{
    const carts= await cartRepo.getAll() ;
    const cartId = req.session.cartId;
    if(!cartId){
        req.session.cartId = cartRepo.randomise();
        cartId = req.session.cartId;
    }

    res.send(await cartHtml({cartId,carts}));
})

prodDisplay.post("/cart/:cid/:rid/remove",async(req,res)=>{
    const removeProductId = req.params.rid
    const cartId =  req.params.cid;
    
    try{
        await cartRepo.removeFromCart({cartId,removeProductId})
    }catch(err){
        return res.send("No such Products")
    }
    res.redirect("/cart")
})
module.exports = prodDisplay;
