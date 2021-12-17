
import express from 'express'
import path from "path";
import { connectDatabase } from './database';

const app = express();
app.use(express.urlencoded({extended: true})) 

connectDatabase().then(()=>{
    app.listen(8080, () => {
        console.log('listening on 8080');
    })
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname +'/index.html')
    })
    
    app.get('/write', (req, res) => {
        res.sendFile(__dirname +'/write.html')
    })
    
    app.post('/add', (req, res) => {
        console.log(req.body);
        res.send('전송완료')
    })
})


