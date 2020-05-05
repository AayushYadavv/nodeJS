const layout = require("../layout")
const {validator} = require("../helper")
module.exports = ({errors,product})=>{
    div = `<div class="container">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <form ref='uploadForm' 
        id='uploadForm' 
        action='/admin/products/${product.id}/edit' 
        method='post' 
        encType="multipart/form-data">
          <h1 class="title">Edit Product</h1>
          <div class="field">
            <label class="label">Product Name</label>
            <input required class="input" value="${product.productname}" placeholder="Product Name" name="productname" />
            <p class="help is-danger">${validator(errors, 'productname')}</p>
          </div>
          <div class="field">
            <label class="label">Product Price</label>
            <input required class="input" value="${product.productprice}" placeholder="Product Price" name="productprice" />
            <p class="help is-danger">${validator(errors, 'productprice')}</p>
          </div>
          <div class="field">
            <label class="label">Product Image</label>
            <input  class="input"  name="image" type="file" />
            
          </div>
          <button class="button is-primary">Add Product</button>
        </form>
       
      </div>
    </div>
  </div>`;
  return layout({div})
}