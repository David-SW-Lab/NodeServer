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

export const increaseCountPost = () =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    db.collection("counter").updateOne(
      { name: "Count" },
      { $inc: { totalPost: 1 } },
      (err, result) => {
        if (err) reject();

        console.log("count update");
        resolve(result);
      }
    );
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
          }),
          result
        );
        resolve(postCount + 1);
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

export const searchData = data =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    const condition = [
      {
        $search: {
          index: "titleSearch",
          text: {
            query: data,
            path: "title"
          }
        }
      }
      // sort
    ];

    db.collection("post")
      // .find({ title: data })
      // .find({ $text: { $search: data } })
      .aggregate(condition)
      .toArray((err, result) => {
        if (err) reject();

        console.log(result);
        resolve(result);
      });
  });

export const deleteData = body =>
  new Promise((resolve, reject) => {
    const db = client.db("todoapp");

    db.collection("post").deleteOne(body, (err, result) => {
      if (err) reject();

      console.log("delete");
      resolve(result);
    });
  });
