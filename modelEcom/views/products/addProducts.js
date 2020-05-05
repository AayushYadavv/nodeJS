/** @format */
const {validator} = require("../helper.js")
const layout = require("../layout.js")

module.exports = ({ errors }) => {
  const div = `<div class="container">
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <form ref='uploadForm' 
      id='uploadForm' 
      action='/admin/products/new' 
      method='post' 
      encType="multipart/form-data">
        <h1 class="title">Add Product</h1>
        <div class="field">
          <label class="label">Product Name</label>
          <input required class="input" placeholder="Product Name" name="productname" />
          <p class="help is-danger">${validator(errors, 'productname')}</p>
        </div>
        <div class="field">
          <label class="label">Product Price</label>
          <input required class="input" placeholder="Product Price" name="productprice" />
          <p class="help is-danger">${validator(errors, 'productprice')}</p>
        </div>
        <div class="field">
          <label class="label">Product Image</label>
          <input required class="input"  name="image" type="file" />
          
        </div>
        <button class="button is-primary">Add Product</button>
      </form>
     
    </div>
  </div>
</div>`;

   return layout({div})
};
