/** @format */

const layout = require("../layout.js");
const {validator} = require("../helper.js")
module.exports = ({ req, errors }) => {
  const div = `<div class="container">
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <form method="POST">
        <h1 class="title">Sign Up</h1>
        <div class="field">
          <label class="label">Email</label>
          <input required class="input" placeholder="Email" name="email" />
          <p class="help is-danger">${validator(errors, 'email')}</p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input required class="input" placeholder="Password" name="password" type="password" />
          <p class="help is-danger">${validator(errors, 'password')}</p>
        </div>
        <div class="field">
          <label class="label">Password Confirmation</label>
          <input required class="input" placeholder="Password Confirmation" name="confirm-password" type="password" />
          <p class="help is-danger">${validator(
            errors,
            'confirm-password'
          )}</p>
        </div>
        <button class="button is-primary">Submit</button>
      </form>
      <a href="/signin">Have an account? Sign In</a>
    </div>
  </div>
</div>`;

  return layout({div});
};
