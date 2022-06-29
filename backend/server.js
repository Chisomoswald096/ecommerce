const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/userModel");
const Product = require("./models/productModel");
const Category = require("./models/categoryModel");
const Favourite = require("./models/favouriteModel");
const path = require("path")

const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
app.use(express.json());
app.use(cors());





//home page
app.get("/", function (req, res) {
    res.json("This is the ecomerce backend api")
})

//register page
app.post("/users/register", async function (req, res) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        console.log("this email has already been used");
        res.send({ error: "this email has already been used" });
        return;

    }
    const newUser = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        isAdmin : false
    });

    await newUser.save();
    console.log("User saved successfully");
    res.send({ success: "User saved successfully" })
});
//add product
app.post("/products", async function (req, res) {
    console.log(req.body);

    const newProduct = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        categoryId: req.body.category
    });
    await newProduct.save();
    console.log("Product Saved Successfully");

})
//login
app.post("/users/login", async function (req, res) {
    //search for a user with same email as the req.body at login
    const existingUser = await User.findOne({ email: req.body.email });
    //if user does not exist stop the code and send the error message below
    if (!existingUser) {
        res.send({ error: "User does not exist" });
        return;
    }
    // if the User exists but he / she password is not equal to the req.body.password stop the code
    //and display the code below
    if (existingUser.password !== req.body.password) {
        res.send({ error: "Password is incorrect" })
        console.log({ error: "Password is incorrect" })
        return;
    }
    res.send({ user: existingUser });
    console.log({ user: existingUser });


})

//Update User Account
app.put("/users/:id", async (req, res) => {
    
    const user = await User.findById(req.params.id)
    user.userName = req.body.userName || user.userName
    user.password = req.body.password || user.password

    const updatedUser = await user.save();
    res.send(updatedUser)




})
// app.get("/users/:id", async (req, res)=>{
//     const userId = req.params.id;
//     const user = await User.findById(userId);
//     if(!user){
//         console.log("User Not Found ");
//         return
//     }
//     console.log(user)
//     res.send(user);
//})

app.post("/favourite", async function (req, res) {
    console.log(req.body);

    const newFavourite = new Favourite({
        name: req.body.name,
        state: req.body.state,
        age: req.body.age,
    });
    await newFavourite.save();
    console.log("Favourites Saved Successfully");
})
   
//get all product
app.get("/products", async function (req, res) {
    const name = req.query.name || "";
    const nameFilter = {name:{$regex: name, $options:'i'}}
    const products = await Product.find({...nameFilter});
    res.send(products)
})
//DELETE a product
// /:id = req.param
app.delete("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    await product.deleteOne();
    console.log("product deleted successfully");
})

//get a product
app.get("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        res.send(product);
    } else {
        console.log("Product was not found");
    }
})
//update a product
app.put("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.name = req.body.image;
        product.name = req.body.price;

        await product.save();
    }
    else {
        console.log("Product was not found");
    }

})


//get summary
app.get("/summary", async (req, res)=>{
    const products = await Product.countDocuments();
    const users = await User.countDocuments();
    const Category = await Category.countDocuments();
    res.send({products, users, Category});
    console.log({products, users, Category});
})


//add-category
app.post("/category", async function (req, res) {
    console.log(req.body);
const existingCategory = await Category.findOne({name : req.body.name});
if(existingCategory){
    res.send({message : "Category already exists"})
    return
}

    const newCategory = new Category({
        name: req.body.name,
    });
    await newCategory.save();
    console.log("Category Saved Successfully");

})
// get all category
app.get("/category", async function (req, res) {
    const name = req.query.name || "";
    const nameFilter = {name:{$regex: name, $options:'i'}}
    const category = await Category.find({...nameFilter});
    res.send(category)
})
//DELETE a category
// /:id = req.param
app.delete("/category/:id", async function (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    await category.deleteOne();
    console.log("category deleted successfully");
})
//get a category
app.get("/category/:id", async function (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
        res.send(category);
    } else {
        console.log("Category was not found");
    }
})
//get all product in a category
app.get("/category-products/:id", async (req, res)=>{
    const products = await Product.find({categoryId : req.params.id})
    res.send(products);
})

//const MongoDBUrl = "mongodb://127.0.0.1:27017/ecommerce";
const MongoDBUrl = "mongodb+srv://chisomoswald096:chisomoswald096@pedromontage.yfniu.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MongoDBUrl)
    .then(result => console.log("mongodb connected"))
    .catch(err => console.log(err))


//connecting the frontend and bbackend
const __dirnames = path.resolve();
app.use(express.static(path.join(__dirname, `/../frontend/build`)));
app.get('*', (req, res)=> {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(process.env.PORT ||  5000, () => {
    console.log("App is running on port 5000")
});