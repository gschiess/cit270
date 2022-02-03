const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello browser");
});

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(req.body.userName == "gabrielschiess" && md5(req.body.password) == '5f4dcc3b5aa765d61d8327deb882cf99'){
        res.send("Welcome!")
    } else{
        res.send("Get Thee Hence!");
    }
});

app.listen(port, ()=>{})