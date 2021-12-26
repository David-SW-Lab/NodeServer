import express from "express";
import { __express } from "ejs";
import { addData, connectDatabase, getData, getCountPost } from "./database";

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", __express);

connectDatabase().then(() => {
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
    getCountPost().then(count => addData(req.body, count));
    res.send("전송완료");
  });

  app.get("/list", (req, res) => {
    getData().then(data => {
      res.render("list.ejs", { posts: data });
    });
  });
});
