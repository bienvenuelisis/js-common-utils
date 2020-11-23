/* eslint-disable no-unused-vars */
// Make a copy of this file and save it as config.js (in the js directory).

// Set this to the base URL of your sample server, such as 'https://your-app-name.herokuapp.com'.
// Do not include the trailing slash. See the README for more information:

var SAMPLE_SERVER_BASE_URL = 'http://YOUR-SERVER-URL';

// OR, if you have not set up a web server that runs the learning-opentok-php code,
// set these values to OpenTok API key, a valid session ID, and a token for the session.
// For test purposes, you can obtain these from https://tokbox.com/account.

var API_KEY = '46481722';
var SESSION_ID = '1_MX40NjQ4MTcyMn5-MTU3NzA5NzcyNzE3OH40NTVYRzloL3Uvc1l1M1pXem5oeXBkNmx-UH4';
var TOKEN = 'T1==cGFydG5lcl9pZD00NjQ4MTcyMiZzaWc9ZTkwZGYxYzEwMzM1ZDkzMmNhOWMzYjU3ODQ1N2IyMWVlZDgyY2' +
    'FlZTpzZXNzaW9uX2lkPTFfTVg0ME5qUTRNVGN5TW41LU1UVTNOekE1TnpjeU56RTNPSDQwTlRWWVJ6bG9MM1V2YzFsMU0xcFh' +
    'lbTVvZVhCa05teC1VSDQmY3JlYXRlX3RpbWU9MTU3NzA5Nzc0OCZub25jZT0wLjc0MTU' +
    'zMzg1NTkwNDY5NDImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3OTY4OTc0NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

var TOKEN_SUBSCRIBER = 'T1==cGFydG5lcl9pZD00NjQ4MTcyMiZzaWc9YWIzOWRmOGY2ODMxNzk3MzkxMmJjYmI0NDY1N2UyYzdkZmE2' +
    'OTM1YjpzZXNzaW9uX2lkPTFfTVg0ME5qUTRNVGN5TW41LU1UVTNOekE1TnpjeU56RTNPSDQwTlRWWVJ6bG9MM1V2YzFsMU0xcFhlbT' +
    'VvZVhCa05teC1VSDQmY3JlYXRlX3RpbWU9MTU3NzA5NzgwMiZub25jZT0wLjU5ODI4MzQ3ODIwMTY4' +
    'NSZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTU3OTY4OTc5OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';


var apiKey = API_KEY;
var sessionId = SESSION_ID;
var token = TOKEN;
var token_subscriber = TOKEN_SUBSCRIBER;

function handleError(error) {
    if (error) {
        console.error(error);
    }
}

function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function streamCreated(event) {
        var subscriberOptions = {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        };
        session.subscribe(event.stream, 'subscriber-default', subscriberOptions, handleError);
    });

    session.on('sessionDisconnected', function sessionDisconnected(event) {
        console.log('You were disconnected from the session.', event.reason);
    });

    // initialize the publisher
    var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    };
    var publisher = OT.initPublisher('publisher-default', publisherOptions, handleError);

    // Connect to the session
    session.connect(token, function callback(error) {
        if (error) {
            handleError(error);
        } else {
            // If the connection is successful, publish the publisher to the session
            session.publish(publisher, handleError);
        }
    });
}

// See the config.js file.
if (API_KEY && TOKEN && SESSION_ID) {
    apiKey = API_KEY;
    sessionId = SESSION_ID;
    token = TOKEN;
    initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
    // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
    fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
        return res.json();
    }).then(function fetchJson(json) {
        apiKey = json.apiKey;
        sessionId = json.sessionId;
        token = json.token;

        initializeSession();
    }).catch(function catchErr(error) {
        handleError(error);
        alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
    });
}

