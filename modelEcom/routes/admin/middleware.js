/** @format */
const {validationResult}=require('express-validator')
const prodRepo = require("../../repo/product")
module.exports = {
  validatorMware(htmlCaller) {
    return async(req, res, next) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        let product;
        if(req.params.id){
          try{
          console.log(req.params.id)
          product = await prodRepo.findByid(req.params.id);
          }catch(err){
            return res.send("No such Product found")
          }
          return res.send(htmlCaller({errors,product}))
        }
        return res.send(htmlCaller({ errors }));
      }
      next();
    };
  },
  authCheck(req, res, next) {
    if (!req.session.uid) {
      return res.redirect("/signin");
    }

    next();
  }
};
