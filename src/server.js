import express from "express";
import { __express } from "ejs";
import * as dbService from "./database";

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", __express);

dbService.connectDatabase().then(() => {
  app.listen(8080, () => {
    console.log("listening on 8080");
  });

  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  app.get("/write", (req, res) => {
    res.sendFile(`${__dirname}/write.html`);
  });

  app.post("/add", (req, res) => {
    return dbService
      .getCountPost()
      .then(count => dbService.addData(req.body, count))
      .then(count => dbService.increaseCountPost(count))
      .then(() => dbService.getData())
      .then(data => {
        res.render("list.ejs", { posts: data });
      });
  });

  app.get("/list", (req, res) => {
    dbService.getData().then(data => {
      res.render("list.ejs", { posts: data });
    });
  });

  app.delete("/delete", (req, res) => {
    console.log(req.body);
    const body = {
      ...req.body,
      // eslint-disable-next-line no-underscore-dangle
      _id: parseInt(req.body._id, 10)
    };
    return dbService.deleteData(body).then(() => {
      res.send("삭제완료");
    });
  });

  app.get("/search", (req, res) => {
    console.log(req.query);
    return dbService.searchData(req.query.value).then(data => {
      res.render("list.ejs", { posts: data });
    });
  });
});
