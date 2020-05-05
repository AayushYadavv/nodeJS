module.exports = ({div})=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shop</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
      <link href="/css/main.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
    </head>

    <body class="admin">
      <header>
        <nav class="navbar is-link " role="navigation">
          <div class="navbar-menu is-active is-primary">
          <div class="navbar-start">
          
              <a href="/" class="navbar-item">
                E-Commerce Site
              </a>
             
              
              <a href="/signin" class="navbar-item">
                Admin
              </a>
          </div>
          <div class= "navbar-end">
            
            
                
           <a href="/cart" class="navbar-item"><i class="fas fa-shopping-cart">Cart</i></a>
               
              
          
          </div>
      
          </div>
        </nav>
</header>
      <div class="container">
      
        ${div}
    
      </div>
    </body>

  </html>`
}