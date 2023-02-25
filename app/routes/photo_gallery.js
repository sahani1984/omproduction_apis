const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/db.config');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

app.post("/api/file-uplaod", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename);
        var id = new Date().getTime().toString();
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        var insertData = "INSERT INTO users_file(id, file_src)VALUES(?,?)"
        connection.query(insertData, [id, imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
            let obj = {};
            obj["type"] = "success",
            obj["msg"] = "file uploaded successfully"
            obj["url"] = imgsrc;
            res.send(obj);
        })
    }
});

module.exports = router;

