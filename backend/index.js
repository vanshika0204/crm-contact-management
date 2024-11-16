const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://sehgalvanshika709:Vanshi29@crm.hthoq.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

// paste your mongoDB Connection string above with password
// password should not contain '@' special character


//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('contact'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})


// Route for Images folder
app.use('/images', express.static('upload/images'));


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


// Schema for creating Product
const Contact = mongoose.model("Contact", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: Number, required: true },
  company: { type: String, required: true },
  job_title: { type: String, required: true }
});


// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});




// endpoint for getting all products data
app.get("/contacts", async (req, res) => {
  let contacts = await Contact.find({});
  console.log("All Contacts");
  res.send(contacts);
});

// Create an endpoint for adding products using admin panel
app.post("/add-contact", async (req, res) => {
  let contacts = await Contact.find({});
  let id;
  if (contacts.length > 0) {
    let last_product_array = contacts.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const contact = new Contact({
    id: id,
    name: req.body.name,
    last_name: req.body.last_name,
    image: req.body.image,
    email: req.body.email,
    phone_no: req.body.phone_no,
    company: req.body.company,
    job_title: req.body.job_title,
  });
  await contact.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name })
});


// Create an endpoint for removing products using admin panel
app.post("/delete-contact", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Deleted");
  res.json({ success: true, name: req.body.name })
});

// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});