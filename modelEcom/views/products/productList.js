/** @format */

const layout = require("../layout");
module.exports = ({ products }) => {
const list = products.map(product=>{
  return `<tr>
  <td>${product.productname}</td>
  <td>${product.productprice}</td>
  <td>
    <a href="/admin/products/${product.id}/edit">
      <button class="button is-link">
        Edit
      </button>
    </a>
  </td>
  <td>
    <form method="post" action="/admin/products/${product.id}/del">
    <button class="button is-danger">Delete</button>
    </form>
  </td>
</tr>
`
}).join(" ");
  let div = `<div class="control">
  <h1 class="subtitle">Products</h1>  
  <a href="/admin/products/new" class="button is-primary">New Product</a>
</div>
<table class="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Price</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    ${list}
  </tbody>
</table>
`
  return layout({ div });
};
