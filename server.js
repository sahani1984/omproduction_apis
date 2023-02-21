const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./app/config/db.config');
const app = express();
// require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(path.join(__dirname, '/public/www')));


function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        console.log('database connected');
    });
    db.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();



app.get('/api/students', (req, res) => {
    let sql = 'select * from student_tbl';
    db.query(sql, (err, result) => {
        if (err) console.log(JSON.stringify(err));
        let obj = {};
        obj["type"] = "success";
        obj["data"] = result;
        res.send(obj);
    })
})


const PORT  = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

