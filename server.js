const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyparser.json());

// db connect --------------------------------------------------------
const MONGODB_URL = "mongodb+srv://lodny:lodny@cluster0.tyk7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const MONGODB_URL = "mongodb://localhost/react-shopping-cart-db";
mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

// product --------------------------------------------------------
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    price: String,
    availableSizes: [String]
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  console.log("inset product");
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

// order --------------------------------------------------------
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: { type: String, default: shortid.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number
        }
      ]
    },
    {
      timestamps: true
    }
  )
);

app.post("/api/orders", async (req, res) => {
  console.log("insert order");

  if (!req.body.email || !req.body.name || !req.body.address || !req.body.total || !req.body.cartItems) {
    return res.send({ message: "Data is required." });
  }

  const newOrder = await Order(req.body).save();
  res.send(newOrder);
});

// listen --------------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
