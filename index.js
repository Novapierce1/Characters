var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var jsonPath = path.join(__dirname, 'data.json');
var clientPath = path.join(__dirname, 'client');
app.use(bodyParser.json());
app.use(express.static(clientPath));


console.log('starting Server');

//get all characters
app.route('/list')
    .get(function(req, res){ 
        fs.readFile(jsonPath, 'utf-8', function (err, file){
        if (err){
            return res.status(500).send('could not read file');
        }
            return res.send(file);
    });
});

//get specific character
app.route('/one/:id')
    .get(function(req, res){ 
        console.log("trying to get one")
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err){
            return res.status(500).send('could not read file');
            } else {
            var arr = JSON.parse(file),
            id = req.params.id,
            result;
            arr.forEach(function(character){
                if (character.id === id){
                    result = character
                }
            });
            if (result) {
                res.send(result)
            }
        }
    })
});
//get character types
app.route('/type/:type')
.get(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.writeHead(500);
                res.end('could not read file');
            } else {
            var job = JSON.parse(file);
            var type = req.params.type;
            var response = job.filter(function(job) {
                if(job.type){
                    if (job.type.toLowerCase().trim() === type.toLowerCase().trim()) {
                    return job;
                    }
                }

            })
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
app.listen(3000);

