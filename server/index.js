const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Use environment variable for the port
const PORT = process.env.PORT || 8080;

// Import models
const User = require("./models/user");
const Dashboard = require("./models/dashboard");
const Delivery = require("./models/delivery");
const Product = require("./models/product");
const Sales = require("./models/order");
const Complaint = require("./models/complaints");
const DeliveryDetails = require("./models/deliveryDetails");

// MongoDB connection using connection string from .env file
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.get("/deliveryDetails", async (req, res) => {
  const data = await DeliveryDetails.find({});
  res.json({ success: true, data: data });
});

app.get("/", async (req, res) => {
  res.send("Welcome to the Mushymate Backend API");
});

//read
app.get("/complaints", async (req, res) => {
  const data = await Complaint.find({});
  res.json({ success: true, data: data });
});

//read
app.get("/delivery", async (req, res) => {
  const data = await Delivery.find({});
  res.json({ success: true, data: data });
});

//create data //save data to mongo
app.post("/delivery/create", async (req, res) => {
  console.log(req.body);
  const data = new Delivery(req.body);
  await data.save();
  res.send({ success: true, message: "data saved succesfully", data: data });
});

//update data
app.put("/delivery/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;

  console.log(rest);
  const data = await Delivery.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data updated successfully", data: data });
});

//delete
app.delete("/delivery/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await Delivery.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});

//read
app.get("/dashboard", async (req, res) => {
  const data = await Dashboard.find({});
  res.json({ success: true, data: data });
  console.log(data);
});

//read
app.get("/users", async (req, res) => {
  const data = await User.find({});
  res.json({ success: true, data: data });
});

app.get("/sales", async (req, res) => {
  const data = await Sales.find({});
  res.json({ success: true, data: data });
});

//product entry
app.post("/product/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});

app.get("/product", async (req, res) => {
  const data = await Product.find({});
  res.json({ success: true, data: data });
});

//create data //save data to mongo
app.post("/product/create", async (req, res) => {
  console.log(req.body);
  const data = new Product(req.body);
  await data.save();
  res.send({ success: true, message: "data saved succesfully", data: data });
});

//update data
app.put("/product/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;

  console.log(rest);
  const data = await Product.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data updated successfully", data: data });
});

//delete
app.delete("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await Product.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});
