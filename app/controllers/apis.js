const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/db.config');




router.get('/students', (req, res) => {
    let sql = 'select * from student_tbl';
    db.query(sql, (err, result) => {
        if (err) console.log(JSON.stringify(err));
        let obj = {};
        obj["type"] = "success";
        obj["data"] = result;
        res.send(obj);
    })
})

module.exports = router;

