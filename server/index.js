
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:8081"
};

//app.use(cors());
app.use(cors(corsOptions));

app.options('*', cors()) // include before other routes

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("../models");
const Role = db.role;

db.mongoose.connect(`mongodb://127.0.0.1:27017/main_db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.get("/api", function (req, res, next) {
  res.json({ message: "Hello from api!" });
});
// routes

require('../routes/auth.routes')(app);
require('../routes/user.routes')(app);

// set port, listen for requests
app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080.')
})