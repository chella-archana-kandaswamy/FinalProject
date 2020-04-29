var express = require('express');
var app = express();
var router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

router.use((req, res, next) => {
    const token = req.header('auth-token');
    console.log("auth-token ", token);
    if (!token) {
        res.send("Token is undefined");
    } else {
        jwt.verify(token, "secretkey", function (err, decodedVal) {
            console.log(decodedVal);
            if (err) {
                res.status("403").send("Access forbiden");
            } else {
                next();
            }
        })
    }
})

router.post('/', (req, res) => {
    console.log("Body", req.body);
    const data = req.body;
    const subscriptionValue = req.get('Ocp-Apim-Subscription-Key');
    console.log("subkey", subscriptionValue);
    axios.put('https://inkrecog-demo.cognitiveservices.azure.com/inkrecognizer/v1.0-preview/recognize',
            data, {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionValue,
                    'Content-type': 'application/json'
                }
            })
        .then(resp => {
            console.log(resp.data);
            res.send(resp.data);
        }).catch(function (err) {
            console.log("Error");
            res.send("Error");
        })
})

module.exports = router;