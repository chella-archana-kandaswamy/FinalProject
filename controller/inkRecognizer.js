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
            if (err.resp.status == 400) {
                res.status(400).send({
                    "message": "Request could not be understood"
                });
            } else if (err.resp.status == 401) {
                res.status(401).send({
                    "message": "Your subscription does not support this request"
                });
            } else if (err.resp.status == 408) {
                res.status(408).send({
                    "message": "Server timed outwaiting for the request"
                });
            } else if (err.resp.status == 413) {
                res.status(413).send({
                    "message": "Payload is too large"
                });
            } else if (err.resp.status == 429) {
                res.status(429).send({
                    "message": "The server is busy. Try again later"
                });
            } else if (err.resp.status == 500) {
                res.status(500).send({
                    "message": "The server has encountered an error"
                });
            } else if (err.resp.status == 501) {
                res.status(501).send({
                    "message": "The request function is not supported"
                });
            } else if (err.resp.status == 401) {
                res.status(401).send({
                    "message": "Your subscription does not support this request"
                });
            }
        })
})

module.exports = router;