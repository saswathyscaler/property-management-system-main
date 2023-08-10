const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const user = require('./router/user');
const cors = require("cors");
const property = require("./router/property");

require('dotenv').config();
const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));  
app.use(morgan("common"));
app.use(cors());


app.use(user);
app.use(property)


const PORT =7000;

mongoose.set("strictQuery", false);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server is connected on ${PORT}`));
  })
  .catch((error) => console.log(`server not connected :: ${error}`));