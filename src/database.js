import { MongoClient } from 'mongodb';

export const connectDatabase = () => new Promise(
    (resolve, reject) => {
        const url = 'mongodb+srv://admin:samsung1010@cluster0.ljgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        MongoClient.connect(url, (err, client) => {
        if (err) reject('error');
    
        resolve();
    })
})

export const connectDatabase1 = () => new Promise((resolve, reject)=>{
    MongoClient.connect('mongodb+srv://admin:samsung1010@cluster0.ljgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
        if (err) reject('error');
    
        resolve();
    })
})

