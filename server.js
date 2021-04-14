const express = require("express")
const dotenv = require("dotenv")
const path = require("path");
const cors =require('cors');
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
var bodyParser = require('body-parser')
const { graphqlUploadExpress } = require('graphql-upload');


const { connectDB } = require("./db")
const app = express()
dotenv.config()
const authRouter = require("./routes/auth");

//start the server
connectDB()
app.use(cors('*'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());


const { authenticate } = require("./middleware/auth")




app.use(express.json());


// parse application/json
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Go to /graphql" })
})
app.use("/api/auth", authRouter);
app.use(authenticate)

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    
    graphiql: true,
  })

  
)

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})