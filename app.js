const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { sequelize } = require("./models");

const app = express();
const port = 3000;

app.set("port", process.env.PORT || port);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Success connect to DB");
  })
  .catch((err) => {
    console.error(err);
  });

/**
 * app.use()
 * url이 없으면 항상 시작됨
 */
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // return res.send();
  return res.send("Hello World!");
});
// app.use((req, res, next) => {
app.use('*', (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error handle middle-ware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
