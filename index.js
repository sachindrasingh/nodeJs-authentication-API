var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var url = 'mongodb://localhost:27017';
var dbName = 'teamstar';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/user/login', function(req, res) {
    var usearName = req.body.username;
    var password = req.body.password;
    var resObj = {
        'success': 'false',
        'errorMessage': 'There was a problem with your login.'
    }
    if (!validateUserName(usearName) || !password) {
        res.send(resObj);
        return;
    };
    MongoClient.connect(url, function(err, client) {
        var userTable = client.db(dbName).collection('user');
        // 
        userTable.find({
            'email': usearName
        }).toArray(function(err, items) {
            if (items.length > 0) {
                // Load hash from your password DB.
                bcrypt.compare(password, items[0].pwd, function(err, isValid) {
                    if (isValid) {
                        // success
                        resObj = {
                            'success': 'true',
                            'data': {
                                'username': items[0].name,
                                'authdata': items[0]._id
                            }
                        }
                    } else {
                        //if invalid password
                        resObj = {
                            'success': 'false',
                            'errorMessage': 'You may have entered an invalid UserID or Password'
                        }
                    }
                    res.send(resObj);
                });
            } else {
                // if invalid user name
                resObj = {
                    'success': 'false',
                    'errorMessage': 'You may have entered an invalid UserID or Password'
                }
                res.send(resObj);
            }
            client.close();
        });
    });
    // res.send(resObj);
});

function validateUserName(usearName) {
    var userIdExpression = /^((?![.,^//\\]).)*$/gm;
    return userIdExpression.test(usearName);
}


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    // console.log('Server started on port ' + app.get('port'));
});