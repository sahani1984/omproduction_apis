const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/db.config');
const path = require('path');

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/gallery')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

router.post("/image-uplaod", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {            
        let id = new Date().getTime().toString();
        let url = 'http://15.206.163.77:3000/images/gallery/' + req.file.filename;
        let title = req.body.title;
        let description = req.body.description;
        let insertData = "INSERT INTO tbl_photo_gallery(id, url, title, description)VALUES(?,?,?,?)"
        db.query(insertData, [id, url, title, description], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
            let obj = {};
            obj["type"] = "success",
            obj["msg"] = "file uploaded successfully"
            obj["url"] = url;
            res.send(obj);
        })
    }
});



/*APIS FOR VIDEO GALLERY*/
let videoStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/video_cover');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let  coverUpload = multer({
    storage: videoStorage
});

router.post("/videos", coverUpload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {            
        let id = new Date().getTime().toString();
        let title = req.body.title;
        let coverUrl = 'http://15.206.163.77:3000/images/videocover/' + req.file.filename;
        let videoUrl = req.body.videoUrl;
        let description = req.body.description;
        let tbl_videocol = req.body.description; // to be removed
        let insertData = "INSERT INTO tbl_video(id, title, coverUrl, videoUrl, description, tbl_videocol)VALUES(?,?,?,?,?,?)"
        db.query(insertData, [id, title, coverUrl, videoUrl, description, tbl_videocol], (err, result) => {
            if (err) throw err
            console.log("Videos Saved  Successfully");
            let obj = {};
            obj["type"] = "success",
            obj["msg"] = "Video Saved successfully"          
            res.send(obj);
        })
    }
});

module.exports = router;

