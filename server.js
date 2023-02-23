const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./app/config/db.config');
// const apis =  require('./app/routes/apis');
const app = express();

/*APP CONFIGURATION*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api', apis);
app.use(express.static(path.join(__dirname, '/public/www')));


/*MYSQL DATABASE CONNETION*/
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
/*handleDisconnect(); */


/*REDIRECT ON GIVEN FILE IF ROUTES NOT FOUND*/
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/public/www/index.html'))
})

app.get('/apis', (req, res)=>{
    res.send("Welocome, Durgesh!!");
})






/*APP LISTEN ON PORT*/
const PORT  = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

