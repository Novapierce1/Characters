var express = require('express');
var url = require('url');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router()
var jsonPath = path.join(__dirname, 'data.json');
var router = express.Router();

app.use(bodyParser.json());
var clientPath = path.join(__dirname, 'client');

console.log('starting Server');

//get all characters
app.route('/api')
    .get(function(req, res){ 
        fs.readFile(jsonPath, 'utf-8', function (err, file){
        
        if (err){
            res.status(500).send('could not read file');
        }
        return res.send(file);
    });
});

//get specific character
app.route('/api/one/:id')
    .get(function(req, res){ console.log("trying to get one")
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err){
            res.status(500).send('could not read file');
            } else {
            var arr = JSON.parse(file);
            var id = req.params.id;
            var result;

            arr.forEach(function(character){
                if (character.id === id){
                    result = character; 
                }
            });
            if (result === undefined) {
                return res.sendStatus(404, 'Character not found');
            } else {
               return res.send(JSON.stringify(result));
            }
        }
    })
});
//get character types
app.route('/api/type/:type')
.get(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.writeHead(500);
                res.end('could not read file');
            } else {
            var arr = JSON.parse(file);
            var type = req.params.type;
            var result;

            arr.forEach(function(character){
                if (character.type == type){
                    result = character;
                }
            });
            if (result === undefined) {
                return res.sendStatus(404, 'Character type not found');
            } else {
                return res.send(JSON.stringify(result));
            }
        }
    })
});
app.listen(3000);

