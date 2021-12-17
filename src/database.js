import { MongoClient } from 'mongodb';
let client;

export const connectDatabase = () => new Promise(
    (resolve, reject) => {
        const url = 'mongodb+srv://admin:samsung1010@cluster0.ljgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        MongoClient.connect(url, (err, c) => {
        if (err) reject('error');
    
        client = c;
        resolve();
    })
})

export const addData = () => new Promise((resolve, reject)=>{
    const db = client.db('todoapp');

    db.collection('post').insertOne( {이름 : 'John', _id : 100} , (err, result)=>{
	    console.log('저장완료'); 
        resolve();
	});
})

