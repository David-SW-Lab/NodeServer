import express from 'express'
import path from "path";

const htmlPath = path.resolve(__dirname, "../html");
const app = express();
app.use(express.urlencoded({extended: true})) 

app.listen(8083, () => {
    console.log('listening on 8083');
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


