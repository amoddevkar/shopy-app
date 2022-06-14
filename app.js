const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require("path");

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["set-cookie"],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname,"client","build")))
// app.get("*",(req,res)=>{
//   res.sendFile(path.join(__dirname,"client","build","index.html"))
// })

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//temp check
app.set("view engine", "ejs");

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const home = require("./routes/home");
const user = require("./routes/client");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

//router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);



// export app js
module.exports = app;
