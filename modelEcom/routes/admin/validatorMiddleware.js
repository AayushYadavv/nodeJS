/** @format */
const {validationResult}=require('express-validator')

module.exports = {
  validatorMware(htmlCaller) {
    return (req, res, next) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.send(htmlCaller({ errors }));
      }
      next();
    };
  },
};
