const handlebars = require("express-handlebars");
const path = require("path");
const express = require("express");
const nodemon = require("nodemon");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { urlencoded, json } = require("express");
const router = require("./routes");
const app = express();
const port = 3000;

const SoftMiddleware = require("./app/middlewares/SoftMiddleware");
const route = require("./routes");

const db = require("./config/db");

//connect to db

db.connect();

//HTTP
app.use(morgan("combined"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//custom middlewares

app.use(SoftMiddleware);

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//Handlebars

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.colum ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return ` <a href="?_sort&colum=${field}&type=${type}"><span class="${icon}"></span></a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resourses", "views"));
app.use(express.static(path.join(__dirname, "public")));

//router init

route(app);

app.listen(port, () => {
  console.log(`Run port ${port}...`);
});
