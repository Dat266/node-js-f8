const newRouter = require("./new");
const meRouter = require("./me");
const coursesRouter = require("./courses");

const siteRouter = require("./site");

function router(app) {
  app.use("/new", newRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = router;
