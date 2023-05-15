const express = require("express");
const app = express();
const port = 5500;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify:true
//   })
//   .then(console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err));



mongoose.connect('mongodb://127.0.0.1:27017/testproj').then(function(data)
{
    console.log('server is connected');
}).catch(err=>{
    console.log(err);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
app.use("/lama",(req,res)=>{
    console.log("hi from lama");
})

const upload = multer({ storage: storage });
app.post("/back/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use("/back/auth", authRoute);
app.use("/back/users", userRoute);
app.use("/back/posts", postRoute);

app.get("/" ,(req, res) => {
  let pathFile = path.join(__dirname,"Front/signup.html");
    res.sendFile(pathFile);
})
app.listen(port, () => {
  console.log("Backend is running.");
});


