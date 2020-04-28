# Ink Recognizer
Ink recognizer API is used to recognize the written words and shapes. It takes in the ink strokes to get the recognition result in the response.

## Table of Contents

* [Recognize](#Recognize)
* [Demo using Postman](#Demo-using-Postman)
* [References](#References)

## Recognize
The Ink Recognizer API recognizes handwriting created in digital ink in 63 languages. It also identifies common polygon shapes in digital ink along with their geometric hot points and coordinates.

### URL
`https://{Endpoint}/inkrecognizer/v1.0-preview/recognize`

### Method
`PUT`

### Request Headers
`x-ms-client-request-id : [string] [optional]`<br/>
Specific value which can be used to identify a query. This value will be returned back as part of the response headers if specified.

`Content-Type : [string] [optional]`<br/>
Media type of the body sent to the API

`Ocm-Apim-Subscription-Key : [string] [required]`<br/>
Subscription key which provides access to the API

### Request Body
`application/json` : The ink content<br/>
* `applicationType [optional]`: Domain of the client application.
*  `inkPointValueAttributes [optional]` : A container for the attributes of a value contained in the ink point object.
* `inputDeviceKind [optional]` : identifies the kind of device used as the writing instrument.
* `language [required]` : language code for the expected language for the handwritten content in the ink strokes.
* `strokes [required]` : array of strokes sent for recognition.
* unit [optional] : physical unit of the ink strokes.
* `unitMultiple [optional]` : scaling factor to be applied to the point coordinates when interpreting them in the physical units specified.


```
{"version":1,"language":"en-US","unit":"mm","strokes":[{"id":183,"points":"11.89084,21.69333,11.84664,21.69333,11.74365,21.69333,11.58458,21.69333,11.3769,21.69333,11.13603,21.69333,10.91951,21.73753,10.70778,21.79632,10.53443,21.8966,10.40975,22.04479,10.33059,22.23934,10.28765,22.46819,10.27013,22.71949,10.26828,22.98349,10.2746,23.25317,10.28391,23.52744,10.29315,23.80157,10.34497,24.02904,10.45348,24.1945,10.66368,24.34503,10.9332,24.46251,11.27836,24.54349,11.64686,24.59245,12.00858,24.61708,12.34962,24.62536,12.66655,24.57985,12.91754,24.47099,13.09289,24.30136,13.20062,24.08598,13.25622,23.84014,13.2763,23.57667,13.27521,23.25736,13.26372,22.92023,13.24898,22.58729,13.19093,22.31304,13.07688,22.11477,12.91003,21.98819,12.65335,21.91897,12.35118,21.89021,12.03343,21.88656,11.76191,21.89608","language":"en-US"}]}
```
### Success Response:
 **Status Code:** 200 : The results were processed successfully.

### Error Response:
**Status Code:** 400 : The request could not be understood<br/>
**Status Code:** 401 : Your subscription does not support this request.<br/>
**Status Code:** 408 : The server timed out waiting for this request.<br/>
**Status Code:** 413 : The payload is too large<br/>
**Status Code:** 429 : The server is busy. Please try again later.<br/>
**Status Code:** 500 : The server has encountered an error<br/>
**Status Code:** 501 : The requested function is not supported<br/>
**Status Code:** 503 : The service is currently unavailable


## Demo using Postman
Initially we are authorizing the user to access the Ink Recognizer API using JWT (JSON Web Token)<br/>
### Register URL
`http://167.99.144.102:3000/register` <br/>
Registers the user and saves the details in the mongo database
#### Method
`POST`
### Request Body
* Content-Type : JSON 
* Body data 
    * `name : [string] [required]` - Name of the user
    * `email : [string] [required] [email]` - Email of the user
    * `password : [string] [required] [min[6]]` - Password 
    <br/>
```
{
	"name" : "Archana",
	"email": "arch@gmail.com",
	"password": "Guru123"
	
}
```
<br/>

**Success Response** : User is registered successfully

**Error Response** <br/>
- Status code: 400
    - Enter valid details (if the data validation does not match the schema)
    - Email already exists (when trying to register the same email address)


#### Login URL
`http://167.99.144.102:3000/register` <br/>
Logins the user and sends the token as a response<br/>
#### Method
`POST`

#### Request Body
* Content-Type : JSON 
* Body data 
    * `email : [string] [required] [email]` - Email of the user
    * `password : [string] [required] [min[6]]` - Password 
    <br/>

```
{
	"email": "arch@gmail.com",
	"password": "Guru123"
	
}
```
<br/>

**Success Response** : Returns a token

**Error Response** <br/>
- Status code: 400
    - Enter valid details (if the data validation does not macth the schema)
    - Login successful (when password didn't match or email doesn't exists in the database)

#### Ink Recognizer URL
`http://167.99.144.102:3000/inkrecognizer`<br/>
Calls the Ink Recognizer API internally.
#### Method
`PUT`

#### Request Headers
Following are the key value pairs of the headers
* `Ocp-Apim-Subscription-Key` : *Provided in the canvas submission*
* `auth-token` : *Enter the token that is obtained in the response of the login api call*

#### Request Body
Ink strokes in the JSON format
```
{
  "language": "en-US",
  "version": 1,
  "strokes": [
    {
      "id": 96,
      "points": "75.0358,24.5004,74.6125,24.5004,74.1892,24.7121,73.5542,25.1354,72.4958,25.9821,70.8025,28.0987,70.1675,30.4271,69.7442,31.9088,69.3208,33.3904,68.4742,34.6604,68.2625,35.7188,68.2625,36.3537,68.2625,36.7771,68.2625,37.4121,68.8975,39.1054,69.5325,39.9521,70.1675,40.7987,72.2842,42.2804,73.7658,42.9154,75.0358,43.3388,76.5175,43.9737,77.7875,43.9737,79.2692,43.9737,81.3858,43.3388,83.0792,42.9154,83.7142,42.7038,84.1375,42.2804,84.3492,41.8571,84.7725,40.7987,85.1958,39.3171,85.1958,38.4704,85.1958,37.2004,84.9842,34.8721,84.7725,33.6021,84.3492,32.1204,83.7142,29.7921,82.8675,28.3104,82.2325,27.8871,81.5975,27.0404,80.5392,26.4054,79.9042,26.1938,79.4808,25.9821,78.8458,25.7704,78.4225,25.5588,77.9992,25.1354,77.3642,25.1354,77.1525,25.1354,76.9408,25.1354,76.7292,25.1354,76.5175,25.1354,76.3058,25.1354,75.8825,25.1354,75.6708,25.1354,75.2475,25.1354,74.8242,25.1354,74.4008,25.1354,74.1892,25.1354,73.9775,25.1354,73.7658,25.1354,73.5542,25.1354,73.3425,25.1354"
    }
  ]
}
```
### Success Response
**Status Code : 200** 
```
{
    "recognitionUnits": [
        {
            "alternates": [
                {
                    "category": "inkDrawing",
                    "confidence": 0.446628212928772,
                    "points": [
                        {
                            "x": 69.11,
                            "y": 24.62
                        },
                        {
                            "x": 69.11,
                            "y": 44.75
                        },
                        {
                            "x": 86.28,
                            "y": 44.75
                        },
                        {
                            "x": 86.28,
                            "y": 24.62
                        }
                    ],
                    "recognizedString": "ellipse",
                    "rotationAngle": 0
                }
            ],
            "boundingRectangle": {
                "height": 19.479999542236328,
                "topX": 68.26000213623047,
                "topY": 24.5,
                "width": 16.940000534057617
            },
            "category": "inkDrawing",
            "center": {
                "x": 76.66999816894531,
                "y": 31.950000762939453
            },
            "class": "leaf",
            "confidence": 1,
            "id": 1,
            "parentId": 0,
            "points": [
                {
                    "x": 68.38999938964844,
                    "y": 25.3799991607666
                },
                {
                    "x": 68.38999938964844,
                    "y": 43.9900016784668
                },
                {
                    "x": 87,
                    "y": 43.9900016784668
                },
                {
                    "x": 87,
                    "y": 25.3799991607666
                }
            ],
            "recognizedObject": "circle",
            "rotatedBoundingRectangle": [
                {
                    "x": 82.58000183105469,
                    "y": 22.8700008392334
                },
                {
                    "x": 86.56999969482422,
                    "y": 42.47999954223633
                },
                {
                    "x": 69.97000122070312,
                    "y": 45.849998474121094
                },
                {
                    "x": 65.9800033569336,
                    "y": 26.25
                }
            ],
            "rotationAngle": 0,
            "strokeIds": [
                96
            ]
        }
    ]
}
```

### Error Response
* **Status Code : 400** : The request could not be understood.
* **Status Code : 403** : Access Forbidden (If the token is invalid)
## References
[Ink Recognizer Documentation](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/inkrecognizer/inkrecognizer/recognize)