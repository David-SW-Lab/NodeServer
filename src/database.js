import { MongoClient } from "mongodb";

let client;

export const connectDatabase = () =>
  new Promise((resolve, reject) => {
    const url =
      "mongodb+srv://admin:samsung1010@cluster0.ljgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    MongoClient.connect(url, (err, c) => {
      if (err) reject();

      client = c;
      resolve();
    });
  });

export const getCountPost = () =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    db.collection("counter").findOne({ name: "Count" }, (err, result) => {
      if (err) reject();

      console.log("getCountPost: ", result.totalPost);
      resolve(result.totalPost);
    });
  });

export const addData = (data, postCount) =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    db.collection("post").insertOne(
      { _id: postCount + 1, title: data.title, date: data.date },
      (err, result) => {
        if (err) reject();

        console.log(
          "저장완료",
          JSON.stringify({
            _id: postCount + 1,
            title: data.title,
            date: data.date
          })
        );
        resolve(result);
      }
    );
  });

export const getData = () =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    db.collection("post")
      .find()
      .toArray((err, result) => {
        if (err) reject();

        console.log(result);
        resolve(result);
      });
  });
