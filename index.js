const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require('mongoose')
require('dotenv').config()

const schema = require("./schema/graphql");

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect("mongodb+srv://yoshiDino:test123@cluster0.opk8e.mongodb.net/pinterest-clone", { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => app.listen(process.env.PORT || 4000, () => console.log("Listening on Port")))
.catch(err => console.log(err))

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

