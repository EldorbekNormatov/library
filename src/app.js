require("dotenv").config()
const express = require("express")
const fileUpload = require("express-fileupload")
// const fileUpload = require("express-fileupload");


const routes = require("./routes")
// const {get} = require("./controllers/controller")
// console.log(get);

const app = express()


const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(fileUpload())
app.use("/api", routes)

app.listen(PORT, () => {
    console.log(PORT);
}) 
