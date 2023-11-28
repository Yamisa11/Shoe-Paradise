# Shoe Catalogue App 👞

![shoe-paradise-website](https://github.com/Horizyn77/shoe-catalogue/assets/116552523/6f309c2e-8b13-45f2-a5d7-3ab56ee214ee)

Link to app 🔗:  

https://shoe-catalogue.onrender.com/

Please note the app is using a free hosting account on Render.com which has limitations. Shoe data is being loaded from an external API. To speed up the loading process open and then close the site and reload it again a few times. 

### Shoe Catalogue API

This app makes use of an accompanying API that I also built to get a list of shoes, and do some other functions like filtering, adding a new shoe to the database and updating a shoes stock.

Link to API Repository 🔗:

https://github.com/Horizyn77/shoe-catalogue-api

## Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)

## Overview 📝<a name="overview"></a>

The Shoe Catalogue App is an e-commerce website that can be used to buy shoes. You start off by creating an account and logging in. You can filter from a list of shoes to buy, add shoes to cart, and checkout shoes in cart. Your purchased shoes will be added to your orders page. You can also add shoes to a wishlist and view and update your account details. An admin can add new shoes to the database.

## Features 🌟<a name="features"></a>

### Filtering 

Users can filter shoes by brand, colour and size or a combination of these

### Accounts

Users can create secure accounts and login. Their order history and items in cart will be saved and available again when they login.

### View and Update Account Details

Users can view and update their account details and information

### Dynamic Cart & Stock Update

Users can add items to cart and when checking out the items stock will be updated. The data for the cart is persisted meaning when a user adds items to cart and logs out and logs back in, the items previously added to cart will still reflect

### Wishlist

Users can add and remove shoes from their wishlist

### Order History

When users checkout their cart, they will be able to view their order history on the orders page, along with the details of the payment amount and the date the order was placed

### Adding Shoes

An admin can add new shoes to the database and it will be displayed on the home page.

### Form Validation

There are useful error messages when logging in and signing up that notify the user

## Technologies Used 💻<a name="technologies-used"></a>

#### HTML/CSS
Used for adding the structure of elements on the page and styling
#### Javascript
Used for user interactivity
#### Node.js/Express
Used for setting up a server and handling routes and logic  
#### Handlebars  
Used for HTML templating
#### PostgreSQL
Used for providing database and crud functionality
#### Bcrypt
Used to hash and encrypt passwords
#### JWT
Used to create a secure token to authenticate users
#### Axios
Used for making HTTP requests from the front-end site to the back-end API and server
#### Toastify
Used for displaying nice alert messages whenever a user adds an item to cart or wishlist
