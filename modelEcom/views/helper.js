module.exports = {
    validator(errors, prop) {
    try {
      const meg = errors.mapped()[prop].msg;
      return meg;
    } catch (err) {
      return " ";
    }
  }}