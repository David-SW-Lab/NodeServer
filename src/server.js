
import express from 'express'
import { addData, connectDatabase } from './database';

const app = express();
app.use(express.urlencoded({extended: true})) 

connectDatabase()
    .then(addData)
    .then(()=>{
        app.listen(8080, () => {
            console.log('listening on 8080');
        })
        
        addData();
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


