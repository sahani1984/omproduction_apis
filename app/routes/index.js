const express = require('express');
const multer = require('multer');
const router = express().Router;


router.get('/api/students', (req, res) => {
    let sql = 'select * from student_tbl';
    connection.query(sql, (err, result) => {
        if (err) console.log(JSON.stringify(err));
        let obj = {};
        obj["type"] = "success";
        obj["data"] = result;
        res.send(obj);
    })
})

module.exports = router;

